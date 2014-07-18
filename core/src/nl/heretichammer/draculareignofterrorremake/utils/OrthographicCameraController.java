package nl.heretichammer.draculareignofterrorremake.utils;

import com.badlogic.gdx.InputProcessor;
import com.badlogic.gdx.graphics.OrthographicCamera;

public class OrthographicCameraController implements InputProcessor {

	private int width, height;
	private OrthographicCamera camera;
	
	public OrthographicCameraController(OrthographicCamera camera) {
		this.camera = camera;
	}
	
	public void resize(int width, int height) {
		this.width = width;
		this.height = height;
	}
	
	@Override
	public boolean keyDown(int keycode) {
		// TODO Auto-generated method stub
		return false;
	}

	@Override
	public boolean keyUp(int keycode) {
		// TODO Auto-generated method stub
		return false;
	}

	@Override
	public boolean keyTyped(char character) {
		// TODO Auto-generated method stub
		return false;
	}

	@Override
	public boolean touchDown(int screenX, int screenY, int pointer, int button) {
		// TODO Auto-generated method stub
		return false;
	}

	@Override
	public boolean touchUp(int screenX, int screenY, int pointer, int button) {
		// TODO Auto-generated method stub
		return false;
	}

	@Override
	public boolean touchDragged(int screenX, int screenY, int pointer) {
		// TODO Auto-generated method stub
		return false;
	}

	@Override
	public boolean mouseMoved(int screenX, int screenY) {
		if(screenX < 15) {//mouse is left
			camera.position.x--;
			return true;
		}
		if(screenX > (width - 15)) {//mouse is right
			camera.position.x++;
			return true;
		}
		if(screenY < 15){//mouse is top
			camera.position.y++;
		}
		if(screenY > (height - 15)) {//mouse is bottom
			camera.position.y--;
		}
		
		return false;
	}

	@Override
	public boolean scrolled(int amount) {
		camera.zoom += amount;
		return false;
	}

}
