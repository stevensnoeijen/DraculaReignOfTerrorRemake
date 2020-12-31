export class Constants {
	public static readonly BLOCK_SIZE = 16;
	public static readonly BLOCK_MAX_COLUMNS = 6;
	public static readonly BLOCK_MAX_ROWS = 12;
	public static readonly GAME_WIDTH = 800;
	public static readonly GAME_HEIGHT = 600;
	public static readonly BLOCK_TYPES = [1, 2, 3, 4, 5];
	public static readonly BLOCK_COLORS = {
		1: '#FF2714', // red
		2: '#FF3BFD', // pink
		3: '#00DFFF', // blue
		4: '#F9E900', // yellow
		5: '#00D100', // green
	};

	/**
	 * in ms
	 */
	public static readonly ANIMATION_SWITCH_SPEED = 100;
	public static readonly ANIMATION_GRAVITY_SPEED = 50;
}
