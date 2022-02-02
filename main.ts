input.onButtonPressed(Button.B, function on_button_pressed_b() {
    pins.digitalWritePin(DigitalPin.P10, 0)
    pins.digitalWritePin(DigitalPin.P11, 0)
    pins.digitalWritePin(DigitalPin.P12, 0)
    basic.pause(500)
    pins.digitalWritePin(DigitalPin.P10, 1)
    pins.digitalWritePin(DigitalPin.P11, 1)
    pins.digitalWritePin(DigitalPin.P12, 1)
})
let angle = 0
pins.servoWritePin(AnalogPin.P0, 0)
let lcd_text = ""
tinkercademy.crashSensorSetup(DigitalPin.P13)
pins.digitalReadPin(DigitalPin.P0)
I2C_LCD1602.ShowString(lcd_text, 0, 0)
I2C_LCD1602.LcdInit(39)
basic.forever(function on_forever() {
    
    angle = pins.analogReadPin(AnalogPin.P1)
    pins.servoWritePin(AnalogPin.P13, angle)
    if (pins.analogReadPin(AnalogPin.P1) <= 10) {
        lcd_text = "" + lcd_text + "."
        I2C_LCD1602.ShowString(lcd_text, 0, 0)
    }
    
    if (pins.analogReadPin(AnalogPin.P1) >= 1020) {
        lcd_text = "" + lcd_text + "_"
        I2C_LCD1602.ShowString(lcd_text, 0, 0)
    }
    
    if (tinkercademy.crashSensor()) {
        lcd_text = lcd_text.slice(0, -1)
        // lcd_text = "" + lcd_text + "."
        I2C_LCD1602.ShowString(lcd_text, 0, 0)
    }
    
    // led.plot(2, 2)
    // basic.pause(2000)
    // led.unplot(2, 2)
    if (input.buttonIsPressed(Button.A)) {
        pins.digitalWritePin(DigitalPin.P14, 1)
    } else {
        pins.digitalWritePin(DigitalPin.P14, 0)
    }
    
})
