def on_button_pressed_b():
    pins.digital_write_pin(DigitalPin.P10, 0)
    pins.digital_write_pin(DigitalPin.P11, 0)
    pins.digital_write_pin(DigitalPin.P12, 0)
    basic.pause(500)
    pins.digital_write_pin(DigitalPin.P10, 1)
    pins.digital_write_pin(DigitalPin.P11, 1)
    pins.digital_write_pin(DigitalPin.P12, 1)
input.on_button_pressed(Button.B, on_button_pressed_b)

angle = 0
pins.servo_write_pin(AnalogPin.P0, 0)
lcd_text = ""
tinkercademy.crash_sensor_setup(DigitalPin.P13)
pins.digital_read_pin(DigitalPin.P0)
I2C_LCD1602.show_string(lcd_text, 0, 0)
I2C_LCD1602.lcd_init(39)

def on_forever():
    global angle, lcd_text

    angle = pins.analog_read_pin(AnalogPin.P1)
    pins.servo_write_pin(AnalogPin.P13, angle)

    if pins.analog_read_pin(AnalogPin.P1) <= 10:
        lcd_text = "" + lcd_text + "."
        I2C_LCD1602.show_string(lcd_text, 0, 0)
    if pins.analog_read_pin(AnalogPin.P1) >= 1020:
        lcd_text = "" + lcd_text + "_"
        I2C_LCD1602.show_string(lcd_text, 0, 0)
    if tinkercademy.crash_sensor():
        lcd_text = lcd_text[:-1]
        #lcd_text = "" + lcd_text + "."
        I2C_LCD1602.show_string(lcd_text, 0, 0)
        #led.plot(2, 2)
        #basic.pause(2000)
        #led.unplot(2, 2)
    if input.button_is_pressed(Button.A):
        pins.digital_write_pin(DigitalPin.P14, 1)
    else:
        pins.digital_write_pin(DigitalPin.P14, 0)

basic.forever(on_forever)
