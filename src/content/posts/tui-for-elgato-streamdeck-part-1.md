---
title: Build a TUI for my Streamdeck (1/n)
date: 2026-05-07
level: intermediate
excerpt: and oh boy, what was I thinking.
tags: [linux, system, usb, streaming, golang]
---

Lately I have been digging into options for using my ElGato Streamdeck on Linux
since it's my platform of choice.

Sadly, there's no official support on Linux available yet... (and there will probably never be 🧌)

I've found several [GitHub projects](https://github.com/streamdeck-linux-gui/streamdeck-linux-gui) that looked promising
but I really didn't like their UIs so... TUI IT IS, yay!

This is why I decided to try it myself and oh boy, what was I thinking when starting this journey.

## where do I start?

Before working on the interface itself (btw, the acronym stands for _terminal user interface_), I first need to reverse engineer
data sent by the streamdeck to my PC to find out when a button is pressed, released how do I write text on the LCD screen, create folders, [...]

> Ok, how do I read data from a USB device?

[libusb](https://github.com/libusb/libusb/wiki#downloads) is a cross-platform user-mode library that enables generic access to USB devices.

Mixed with [gousb](https://github.com/google/gousb), I have a direct wrapper over `libusb` to work with USB devices! 

Why Go? Why not. 🤓

## open the device

It's pretty straightforward with the lib:
```go
package main

import (
	"fmt"
	"log"

	"github.com/google/gousb"
)

const (
	ElGatoUsbVendorId  = 0x0fd9
	ElGatoUsbProductId = 0x006d
)

func main() {
	// Initialize a new Context.
	ctx := gousb.NewContext()
	defer ctx.Close()

    // Open the device with its VID/PID
	dev, err := ctx.OpenDeviceWithVIDPID(ElGatoUsbVendorId, ElGatoUsbProductId)
	if err != nil {
		log.Fatalf("OpenDeviceWithVIDPID(%d, %d): %v", ElGatoUsbVendorId, ElGatoUsbProductId, err)
	}
	defer dev.Close()
}
```

A few things I've learned along the way:
- each USB device has their own VID/PID to identify them worldwide
- VID stands for vendor ID and PID for product ID
- a static list of existing VID/PID can be found on the linux-usb.org [website](http://www.linux-usb.org/usb.ids)

Lastly, you can compare those IDs with the printed by your system:
```shell
~
> lsusb
Bus 001 Device 001: ID 1d6b:0002 Linux Foundation 2.0 root hub
Bus 001 Device 002: ID 0b05:19af ASUSTek Computer, Inc. AURA LED Controller
Bus 001 Device 003: ID 174c:2074 ASMedia Technology Inc. ASM1074 High-Speed hub
Bus 001 Device 004: ID 8087:0033 Intel Corp. AX211 Bluetooth
Bus 001 Device 005: ID 05e3:0610 Genesys Logic, Inc. Hub
Bus 001 Device 006: ID 0fd9:006d Elgato Systems GmbH Stream Deck original V2            <-- There it is!
Bus 001 Device 007: ID 1532:0209 Razer USA, Ltd BlackWidow Tournament Edition Chroma
Bus 001 Device 008: ID 1038:1832 SteelSeries ApS SteelSeries Sensei Ten
Bus 001 Device 009: ID b58e:9e84 Blue Microphones Yeti Stereo Microphone
Bus 002 Device 001: ID 1d6b:0003 Linux Foundation 3.0 root hub
Bus 002 Device 002: ID 174c:3074 ASMedia Technology Inc. ASM1074 SuperSpeed hub
Bus 002 Device 003: ID 05e3:0626 Genesys Logic, Inc. Hub
Bus 002 Device 004: ID 1532:0e05 Razer USA, Ltd Razer Kiyo Pro
```

Cool, we have the device open, now let's try to get data from a button press.

## Le button click

```go
func main() {
    //
    // beginning omitted for simplicity
    //
    intf, done, err := dev.DefaultInterface()
    if err != nil {
	    log.Fatalf("%s.DefaultInterface(): %v", dev, err)
	}
	defer done()

	ep, err := intf.InEndpoint(1)
	if err != nil {
		log.Fatalf("%s.InEndpoint(1): %v", intf, err)
	}

	buf := make([]byte, ep.Desc.MaxPacketSize)
	readBytes, err := ep.Read(buf)
	if err != nil {
		fmt.Println("Read returned an error:", err)
	}
	if readBytes == 0 {
		log.Fatalf("IN endpoint 1 returned 0 bytes of data.")
	}
	log.Println("End")
}
```

Ok, let's spend a bit of time around wording.

A device can have multiple configurations (e.g., a "high power" mode vs a "low power" mode). 99% of USB devices only have one configuration, which is active by default.
Usually, the default configuration value is `1`.

Regarding interfaces, a single USB device can serve multiple functions. For example, a webcam might have Interface 0 for the video stream, and Interface 1 for the built-in microphone. The Stream Deck uses Interface 0 to handle all of its HID reports (button presses and sending image data to the LCD screens).

When calling `dev.DefaultInterface()`, you get the default interface (`0` in our case) of the active configuration (`1`).

Endpoints are the actual data pipes. They are strictly directional from the perspective of the computer:
- IN Endpoints: Send data into the computer (e.g., you pressing a Stream Deck button).
- OUT Endpoints: Send data out of the computer (e.g., sending a JPEG to display on a button).

Regarding the line:
```go
ep, err := intf.InEndpoint(1)
```

The endpoint `1` is totally static. It's decided by the manufacturer and I'll need to probably fetch it dynamically to support multiple Stream Decks.
You can compare this number to a classic `port`. They decided to communicate with that value so we have to stick with it.

Ok let's run it.
```shell
Workspace/sandbox/madgato via go v1.26.2 
x go run main.go 
2026/05/07 01:16:05 vid=0fd9,pid=006d,bus=1,addr=6.DefaultInterface(): failed to select interface #0 alternate setting 0 of config 1 of device vid=0fd9,pid=006d,bus=1,addr=6: failed to claim interface 0 on vid=0fd9,pid=006d,bus=1,addr=6,config=1: libusb: device or resource busy [code -6]
exit status 1
```

> Oh noes, it went all kaboom 💣

This error means that another program—specifically, your operating system's kernel—has already claimed the device. Because the Stream Deck identifies itself as a Human Interface Device (HID), the OS (like Linux or macOS) automatically binds its default usbhid driver to it the moment you plug it in. `libusb` operates in "user-space" and cannot claim an interface that the kernel is currently holding.

> And how do I fix it?

We need essentially to detach the kernel driver while our go program runs, and (ideally) reattach it when we're done.
`gousb` got us covered with the `SetAutoDetach(true)` method.

```go
func main() {
	// Initialize a new Context.
	ctx := gousb.NewContext()
	defer ctx.Close()

    // Open the device with it's VID/PID
	dev, err := ctx.OpenDeviceWithVIDPID(ElGatoUsbVendorId, ElGatoUsbProductId)
	if err != nil {
		log.Fatalf("OpenDeviceWithVIDPID(%d, %d): %v", ElGatoUsbVendorId, ElGatoUsbProductId, err)
	}
	defer dev.Close()

	//// Tell libusb to automatically detach the kernel driver (usbhid)
	//// when we claim the interface, and reattach it when we release it.
	if err = dev.SetAutoDetach(true); err != nil {
		log.Printf("Warning: Failed to set auto-detach: %v\n", err)
	}
    // rest of the code that fetches the data
}
```

Let's try again:
```shell
Workspace/sandbox/madgato via go v1.26.2 
x go run main.go
2026/05/07 01:22:12 Read: 512 bytes
2026/05/07 01:22:12 End
```

The `Read()` function is blocking, after pressing my Stream Deck I got results!! ✨

## and now?

In the next post of this series, I'll probably work on either parsing data or writing data to the StreamDeck to configure it!
