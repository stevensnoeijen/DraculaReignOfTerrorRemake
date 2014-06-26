package nl.heretichammer.draculareignofterrorremake.screens;

import com.badlogic.gdx.Gdx;
import com.badlogic.gdx.assets.AssetManager;
import com.badlogic.gdx.graphics.Color;
import com.badlogic.gdx.graphics.GL20;
import com.badlogic.gdx.graphics.Texture;
import com.badlogic.gdx.graphics.g2d.Sprite;
import com.badlogic.gdx.graphics.g2d.SpriteBatch;
import com.badlogic.gdx.graphics.g2d.TextureAtlas;
import com.badlogic.gdx.scenes.scene2d.Actor;
import com.badlogic.gdx.scenes.scene2d.Group;
import com.badlogic.gdx.scenes.scene2d.ui.ButtonGroup;
import com.badlogic.gdx.scenes.scene2d.ui.Image;
import com.badlogic.gdx.scenes.scene2d.ui.ImageButton;
import com.badlogic.gdx.scenes.scene2d.ui.Table;
import com.badlogic.gdx.scenes.scene2d.utils.TextureRegionDrawable;

import nl.heretichammer.draculareignofterrorremake.map.Area;
import nl.heretichammer.draculareignofterrorremake.map.World;
import nl.heretichammer.draculareignofterrorremake.map.WorldMap;
import nl.heretichammer.draculareignofterrorremake.team.Player;
import nl.heretichammer.draculareignofterrorremake.team.Team;
import nl.heretichammer.draculareignofterrorremake.utils.AssetHelper;

public class WorldMapScreen extends SceneScreen {
	
	private AssetManager assetManager = new AssetManager();
	private AssetHelper assetHelper = new AssetHelper(assetManager);
	
	private final UI ui = new UI();
	
	private Player player;
	private WorldMap worldMap;
	
	public WorldMapScreen() {
		World world = new World();
		worldMap = new WorldMap(world);
		
		player = new Player(world.teams.transylvania);
	}
	
	@Override
	public void show() {
		super.show();
		assetManager.load("images/council.pack", TextureAtlas.class);
		assetManager.finishLoading();
		
		ui.background = new Image(assetHelper.getAtlasTexture("images/council.pack:ui-scroll"));
		//ui.background.setZIndex(0);
		stage.addActor(ui.background);
		
		ui.mainTable = new Table();
		ui.mainTable.debug();
		ui.mainTable.setFillParent(true);
		stage.addActor(ui.mainTable);
		//ui.table.left().top();

		ui.mainTable.add( new Image( new TextureRegionDrawable(assetHelper.getAtlasRegion("images/council.pack:ui-tab-training") ) ) );
		ui.mainTable.add(ui.rightTable = new Table());
		ui.rightTable.debug();
		
		ui.rightTable.add(createMap());
		ui.rightTable.row();
		ui.rightTable.add(new Image( new TextureRegionDrawable(assetHelper.getAtlasRegion("images/council.pack:ui-panel-stats") ) ) );
	}
	
	private Actor createMap() {	
		ui.map.group = new Group();
		ui.map.group.setSize(320, 240);
		
		//create areas
		ui.map.areas.sibiu = new ImageButton(createStyle(worldMap.world.areas.sibiu));
		ui.map.group.addActor(ui.map.areas.sibiu);
		
		ui.map.areas.fagaras = new ImageButton(createStyle(worldMap.world.areas.fagaras));
		ui.map.areas.fagaras.moveBy(70, 0);
		ui.map.group.addActor(ui.map.areas.fagaras);

		
		ui.map.buttons = new ButtonGroup(ui.map.areas.sibiu, ui.map.areas.fagaras);
		
		return ui.map.group;
	}
	
	private ImageButton.ImageButtonStyle createStyle(Area area){
		boolean enemy = true;
		if(area.getTeam().equals(player.getTeam())) {//if area has other team
			enemy = false;
		}
		final String buttonUpStyle = "images/council.pack:area-" + area.getName().toLowerCase() + (enemy ? "-enemy" : "");
		final String buttonCheckedStyle = buttonUpStyle + "-select";
		
		//style
		ImageButton.ImageButtonStyle style = new ImageButton.ImageButtonStyle();
		style.up = new TextureRegionDrawable(assetHelper.getAtlasRegion(buttonUpStyle));
		style.checked = new TextureRegionDrawable(assetHelper.getAtlasRegion(buttonCheckedStyle));
		return style;		
	}
	
	@Override
	public void dispose() {
		super.dispose();
	}
	
	private static final class UI {
		Image background;
		Table mainTable;
		Table rightTable;
		
		Map map = new Map();
		
		private static final class Map {
			Group group;
			Areas areas = new Areas();
			ButtonGroup buttons;
			
			private static final class Areas{
				ImageButton sibiu, fagaras, curtea, brasov, pitesti, targo, snagov, giurgiu, braila, hirsova, rasova, ostov;
			}
		}
	}
}
