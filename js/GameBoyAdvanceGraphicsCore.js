function GameBoyAdvanceGraphics(IOCore) {
	this.IOCore = IOCore;
	this.emulatorCore = IOCore.emulatorCore;
	this.initialize();
}
GameBoyAdvanceGraphics.prototype.initialize = function () {
	//Initialize Pre-Boot:
	this.BGMode = 0;
	this.frameSelect = 0;
	this.HBlankIntervalFree = false;
	this.VRAMOneDimensional = false;
	this.forcedBlank = false;
	this.displayBG0 = false;
	this.displayBG1 = false;
	this.displayBG2 = false;
	this.displayBG3 = false;
	this.displayOBJ = false;
	this.displayWindow0Flag = false;
	this.displayWindow1Flag = false;
	this.displayObjectWindowFlag = false;
	this.greenSwap = false;
	this.inVBlank = false;
	this.inHBlank = false;
	this.VCounterMatch = false;
	this.IRQVBlank = false;
	this.IRQHBlank = false;
	this.IRQVCounter = false;
	this.VCounter = 0;
	this.currentScanLine = 0;
	this.BG0Priority = 0;
	this.BG0CharacterBaseBlock = 0;
	this.BG0Mosaic = false;
	this.BG0Palette256 = false;
	this.BG0ScreenBaseBlock = 0;
	this.BG0DisplayOverflow = false;
	this.BG0ScreenSize = 0;
	this.BG1Priority = 0;
	this.BG1CharacterBaseBlock = 0;
	this.BG1Mosaic = false;
	this.BG1Palette256 = false;
	this.BG1ScreenBaseBlock = 0;
	this.BG1DisplayOverflow = false;
	this.BG1ScreenSize = 0;
	this.BG2Priority = 0;
	this.BG2CharacterBaseBlock = 0;
	this.BG2Mosaic = false;
	this.BG2Palette256 = false;
	this.BG2ScreenBaseBlock = 0;
	this.BG2DisplayOverflow = false;
	this.BG2ScreenSize = 0;
	this.BG3Priority = 0;
	this.BG3CharacterBaseBlock = 0;
	this.BG3Mosaic = false;
	this.BG3Palette256 = false;
	this.BG3ScreenBaseBlock = 0;
	this.BG3DisplayOverflow = false;
	this.BG3ScreenSize = 0;
	this.BG0XCoord = 0;
	this.BG0YCoord = 0;
}
GameBoyAdvanceGraphics.prototype.writeDISPCNT0 = function (data) {
	this.JIT();
	this.BGMode = data & 0x07;
	this.frameSelect = (data & 0x10) >> 4;
	this.HBlankIntervalFree = ((data & 0x20) == 0x20);
	this.VRAMOneDimensional = ((data & 0x40) == 0x40);
	this.forcedBlank = ((data & 0x80) == 0x80);
}
GameBoyAdvanceGraphics.prototype.writeDISPCNT1 = function (data) {
	this.JIT();
	this.displayBG0 = ((data & 0x01) == 0x01);
	this.displayBG1 = ((data & 0x02) == 0x02);
	this.displayBG2 = ((data & 0x04) == 0x04);
	this.displayBG3 = ((data & 0x08) == 0x08);
	this.displayOBJ = ((data & 0x10) == 0x10);
	this.displayWindow0Flag = ((data & 0x20) == 0x20);
	this.displayWindow1Flag = ((data & 0x40) == 0x40);
	this.displayObjectWindowFlag = ((data & 0x80) == 0x80);
}
GameBoyAdvanceGraphics.prototype.writeGreenSwap = function (data) {
	this.JIT();
	this.greenSwap = ((data & 0x01) == 0x01);
}
GameBoyAdvanceGraphics.prototype.writeDISPSTAT0 = function (data) {
	//VBlank flag read only.
	//HBlank flag read only.
	//V-Counter flag read only.
	//Only LCD IRQ generation enablers can be set here:
	this.IRQVBlank = ((data & 0x08) == 0x08);
	this.IRQHBlank = ((data & 0x10) == 0x10);
	this.IRQVCounter = ((data & 0x20) == 0x20);
}
GameBoyAdvanceGraphics.prototype.writeDISPSTAT1 = function (data) {
	//V-Counter match value:
	this.VCounter = data;
}
GameBoyAdvanceGraphics.prototype.writeBG0CNT0 = function (data) {
	this.JIT();
	this.BG0Priority = data & 0x3;
	this.BG0CharacterBaseBlock = (data & 0xC) >> 2;
	//Bits 5-6 always 0.
	this.BG0Mosaic = ((data & 0x40) == 0x40);
	this.BG0Palette256 = ((data & 0x80) == 0x80);
}
GameBoyAdvanceGraphics.prototype.writeBG0CNT1 = function (data) {
	this.JIT();
	this.BG0ScreenBaseBlock = data & 0x1F;
	this.BG0DisplayOverflow = ((data & 0x20) == 0x20);	//Note: Only applies to BG2/3 supposedly.
	this.BG0ScreenSize = (data & 0xC0) >> 6;
}