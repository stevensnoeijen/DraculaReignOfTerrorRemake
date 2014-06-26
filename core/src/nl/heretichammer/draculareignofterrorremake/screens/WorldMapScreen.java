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
		//sibiu
		ui.map.areas.sibiu = new ImageButton(createStyle(worldMap.world.areas.sibiu));
		ui.map.areas.sibiu.setPosition(0, 160);
		ui.map.group.addActor(ui.map.areas.sibiu);
		//fagaras
		ui.map.areas.fagaras = new ImageButton(createStyle(worldMap.world.areas.fagaras));
		ui.map.areas.fagaras.setPosition(70, 175);
		ui.map.group.addActor(ui.map.areas.fagaras);
		//curtea
		ui.map.areas.curtea = new ImageButton(createStyle(worldMap.world.areas.curtea));
		ui.map.areas.curtea.setPosition(30, 120);
		ui.map.group.addActor(ui.map.areas.curtea);
		//brasov
		ui.map.areas.brasov = new ImageButton(createStyle(worldMap.world.areas.brasov));
		ui.map.areas.brasov.setPosition(135, 170);
		ui.map.group.addActor(ui.map.areas.brasov);
		//pitesti
		ui.map.areas.pitesti = new ImageButton(createStyle(worldMap.world.areas.pitesti));
		ui.map.areas.pitesti.setPosition(140, 125);
		ui.map.group.addActor(ui.map.areas.pitesti);	
		//tirgo
		ui.map.areas.tirgo = new ImageButton(createStyle(worldMap.world.areas.tirgo));
		ui.map.areas.tirgo.setPosition(100, 85);
		ui.map.group.addActor(ui.map.areas.tirgo);
		//snagov
		ui.map.areas.snagov = new ImageButton(createStyle(worldMap.world.areas.snagov));
		ui.map.areas.snagov.setPosition(195, 110);
		ui.map.group.addActor(ui.map.areas.snagov);	
		//giurgiu
		ui.map.areas.giurgiu = new ImageButton(createStyle(worldMap.world.areas.giurgiu));
		ui.map.areas.giurgiu.setPosition(135, 40);
		ui.map.group.addActor(ui.map.areas.giurgiu);
		
		//add to buttongroup for one selection only
		ui.map.buttons = new ButtonGroup(ui.map.areas.sibiu, ui.map.areas.fagaras, ui.map.areas.curtea, ui.map.areas.brasov, 
				ui.map.areas.pitesti, ui.map.areas.tirgo, ui.map.areas.snagov);
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
				ImageButton sibiu, fagaras, curtea, brasov, pitesti, tirgo, snagov, giurgiu, braila, hirsova, rasova, ostov;
			}
		}
	}
}
