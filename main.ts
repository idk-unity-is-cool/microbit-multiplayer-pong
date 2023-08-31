enum RadioMessage {
    message1 = 49434,
    SHAKE = 2851,
    Player1Up = 18047,
    Player1Down = 14692,
    Player2Up = 51750,
    Player2Down = 48313,
    BallDirDown = 18133,
    BallDirUp = 2862,
    BallDirLeft = 2715,
    BallDirRight = 25002,
    GameStart = 47984
}
radio.onReceivedMessage(RadioMessage.BallDirRight, function () {
    BallX += 1
})
radio.onReceivedMessage(RadioMessage.BallDirDown, function () {
    BallY += -1
})
radio.onReceivedMessage(RadioMessage.BallDirUp, function () {
    BallY += 1
})
radio.onReceivedMessage(RadioMessage.Player1Down, function () {
    PaddlePlayer1 += -1
})
input.onButtonPressed(Button.A, function () {
    if (Player == 1) {
        if (PaddlePlayer1 < 4) {
            PaddlePlayer1 += 1
            radio.sendMessage(RadioMessage.Player1Up)
        }
    } else {
        if (PaddlePlayer2 < 4) {
            PaddlePlayer2 += 1
            radio.sendMessage(RadioMessage.Player2Up)
        }
    }
})
radio.onReceivedMessage(RadioMessage.BallDirLeft, function () {
    BallX += -1
})
radio.onReceivedMessage(RadioMessage.Player2Down, function () {
    PaddlePlayer2 += -1
})
radio.onReceivedMessage(RadioMessage.Player2Up, function () {
    PaddlePlayer2 += 1
})
radio.onReceivedMessage(RadioMessage.Player1Up, function () {
    PaddlePlayer1 += 1
})
input.onButtonPressed(Button.AB, function () {
    if (GameBegining == 1) {
        Player = 1
    }
})
input.onButtonPressed(Button.B, function () {
    if (Player == 1) {
        if (PaddlePlayer1 > 0) {
            PaddlePlayer1 += -1
            radio.sendMessage(RadioMessage.Player1Down)
        }
    } else {
        if (PaddlePlayer2 > 0) {
            PaddlePlayer2 += -1
            radio.sendMessage(RadioMessage.Player2Down)
        }
    }
})
let PaddlePlayer2 = 0
let PaddlePlayer1 = 0
let GameBegining = 0
let Player = 0
Player = 2
GameBegining = 1
PaddlePlayer1 = 0
PaddlePlayer2 = 0
let BallX = 2
let BallY = 2
let BallDirection = randint(0, 1)
let BallDiagonalDirection = randint(0, 1)
radio.sendMessage(RadioMessage.GameStart)
basic.showIcon(IconNames.Silly)
basic.pause(5000)
GameBegining = 0
loops.everyInterval(2000, function () {
    if (GameBegining == 0) {
        if (BallDirection == 0) {
            BallX += -1
            radio.sendMessage(RadioMessage.BallDirLeft)
        } else if (BallDirection == 1) {
            BallX += 1
            radio.sendMessage(RadioMessage.BallDirRight)
        }
        if (BallDiagonalDirection == 0) {
            BallY += -1
            radio.sendMessage(RadioMessage.BallDirDown)
        } else if (BallDiagonalDirection == 1) {
            BallY += 1
            radio.sendMessage(RadioMessage.BallDirUp)
        }
    }
})
basic.forever(function () {
    basic.clearScreen()
    led.plot(4, PaddlePlayer1)
    led.plot(0, PaddlePlayer2)
    led.plot(BallX, BallY)
})
/**
 * Ball Direction:
 * 
 * 0 = left
 * 
 * 1 = right
 * 
 * Ball Diagonal Direction
 * 
 * 0 = down
 * 
 * 1 = up
 */
basic.forever(function () {
    if (BallY == 4) {
        BallDiagonalDirection = 0
    } else if (BallY == 0) {
        BallDiagonalDirection = 1
    }
    if (BallX == 1 && BallY == PaddlePlayer2) {
        BallDirection = 1
        if (BallDiagonalDirection == 0) {
            BallDiagonalDirection = 1
        } else if (BallDiagonalDirection == 1) {
            BallDiagonalDirection = 0
        }
    }
    if (BallX == 3 && BallY == PaddlePlayer1) {
        BallDirection = 0
        if (BallDiagonalDirection == 0) {
            BallDiagonalDirection = 1
        } else if (BallDiagonalDirection == 1) {
            BallDiagonalDirection = 0
        }
    }
})
