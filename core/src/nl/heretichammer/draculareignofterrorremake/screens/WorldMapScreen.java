package nl.heretichammer.draculareignofterrorremake.screens;

import com.badlogic.gdx.Gdx;
import com.badlogic.gdx.assets.AssetManager;
import com.badlogic.gdx.graphics.Color;
import com.badlogic.gdx.graphics.g2d.BitmapFont;
import com.badlogic.gdx.graphics.g2d.TextureAtlas;
import com.badlogic.gdx.graphics.g2d.freetype.FreeTypeFontGenerator;
import com.badlogic.gdx.scenes.scene2d.Actor;
import com.badlogic.gdx.scenes.scene2d.Group;
import com.badlogic.gdx.scenes.scene2d.InputEvent;
import com.badlogic.gdx.scenes.scene2d.ui.Button;
import com.badlogic.gdx.scenes.scene2d.ui.ButtonGroup;
import com.badlogic.gdx.scenes.scene2d.ui.Image;
import com.badlogic.gdx.scenes.scene2d.ui.ImageButton;
import com.badlogic.gdx.scenes.scene2d.ui.Label;
import com.badlogic.gdx.scenes.scene2d.ui.Skin;
import com.badlogic.gdx.scenes.scene2d.ui.Table;
import com.badlogic.gdx.scenes.scene2d.ui.Label.LabelStyle;
import com.badlogic.gdx.scenes.scene2d.ui.Widget;
import com.badlogic.gdx.scenes.scene2d.utils.Align;
import com.badlogic.gdx.scenes.scene2d.utils.ClickListener;
import com.badlogic.gdx.scenes.scene2d.utils.TextureRegionDrawable;
import com.badlogic.gdx.utils.Scaling;

import nl.heretichammer.draculareignofterrorremake.map.Area;
import nl.heretichammer.draculareignofterrorremake.map.World;
import nl.heretichammer.draculareignofterrorremake.map.WorldMap;
import nl.heretichammer.draculareignofterrorremake.team.Player;
import nl.heretichammer.draculareignofterrorremake.utils.AssetHelper;

public class WorldMapScreen extends SceneScreen {
	
	private AssetManager assetManager = new AssetManager();
	private AssetHelper assetHelper = new AssetHelper(assetManager);
	
	private Skin skin;
	private final UI ui = new UI();
	
	private Player player;
	private WorldMap worldMap;
	
	private static final float FONT_SMALL = .75f;
	
	public WorldMapScreen() {
		World world = new World();
		worldMap = new WorldMap(world);
		
		player = new Player(world.teams.transylvania);
	}
	
	@Override
	public void show() {
		super.show();
		assetManager.load("images/council.pack", TextureAtlas.class);
		assetManager.load("uiskin.json", Skin.class);
		assetManager.finishLoading();
		
		skin = assetManager.get("uiskin.json", Skin.class);
		
		ui.background = new Image(assetHelper.getAtlasTexture("images/council.pack:ui-scroll"));
		stage.addActor(ui.background);
		
		ui.mainTable = new Table();
		//ui.mainTable.debug();
		ui.mainTable.setFillParent(true);
		stage.addActor(ui.mainTable);
		
		ui.mainTable.add( createTabs() );
		ui.mainTable.add(ui.rightTable = new Table());
		ui.rightTable.debug();
		
		ui.rightTable.add(createMap());
		ui.rightTable.row();
		
		ui.rightTable.add(ui.rightBottonTable = new Table()).padLeft(10);
		//stats for resources
		ui.rightBottonTable.add( ui.map.statsTable = new Table(skin) );
		ui.map.statsTable.debug();
		ui.map.statsTable.setBackground( new TextureRegionDrawable(assetHelper.getAtlasRegion("images/council.pack:ui-panel-stats") ) );
		ui.map.statsTable.add( ui.map.stats.currentGold = new Label("0000", skin) ).width(35);
		ui.map.stats.currentGold.setFontScale(FONT_SMALL);
		ui.map.statsTable.add( ui.map.stats.currentWood = new Label("0000", skin) ).width(35);
		ui.map.stats.currentWood.setFontScale(FONT_SMALL);
		ui.map.statsTable.add( ui.map.stats.currentFood = new Label("0000", skin) ).width(35);
		ui.map.stats.currentFood.setFontScale(FONT_SMALL);
		ui.map.statsTable.add( ui.map.stats.currentMen = new Label("0000", skin) ).width(35);
		ui.map.stats.currentMen.setFontScale(FONT_SMALL);
		ui.map.statsTable.add( ui.map.stats.currentArmy = new Label("0000", skin) ).width(35);
		ui.map.stats.currentArmy.setFontScale(FONT_SMALL);
		ui.map.statsTable.row().height(20);
		ui.map.statsTable.add( ui.map.stats.weekGold = new Label("1111", skin) ).width(35);
		ui.map.stats.weekGold.setFontScale(FONT_SMALL);
		ui.map.statsTable.add( ui.map.stats.weekWood = new Label("1111", skin) ).width(35);
		ui.map.stats.weekWood.setFontScale(FONT_SMALL);
		ui.map.statsTable.add( ui.map.stats.weekFood = new Label("1111", skin) ).width(35);
		ui.map.stats.weekFood.setFontScale(FONT_SMALL);
		ui.map.statsTable.add( ui.map.stats.weekMen = new Label("1111", skin) ).width(35);
		ui.map.stats.weekMen.setFontScale(FONT_SMALL);
		ui.map.statsTable.add().width(35).center();
		ui.map.statsTable.row();
		
		ui.rightBottonTable.add(ui.rightBottomRightTable = new Table()).pad(20);
		//create year
		ui.map.year = new Label("Anno Domini", skin, "bold");
		ui.map.year.setColor(Color.BLACK);	
		ui.rightBottomRightTable.add(ui.map.year).align(Align.center);
		ui.rightBottomRightTable.row();
		ui.map.currentYear = new Label("0", skin);
		ui.map.currentYear.setFontScale(FONT_SMALL);
		ui.rightBottomRightTable.add(ui.map.currentYear).align(Align.center);
		ui.rightBottomRightTable.row();
		//create week
		ui.map.week = new Label("Week", skin, "bold");
		ui.map.week.setColor(Color.BLACK);
		ui.rightBottomRightTable.add(ui.map.week).align(Align.center);
		ui.rightBottomRightTable.row();
		ui.map.currentWeek = new Label("0", skin);
		ui.map.currentWeek.setFontScale(FONT_SMALL);
		ui.rightBottomRightTable.add(ui.map.currentWeek).align(Align.center);
		ui.rightBottomRightTable.row();
		updateWeekUI();//set texts
		
		ImageButton.ImageButtonStyle waxsealStyle = new ImageButton.ImageButtonStyle();
		waxsealStyle.up = new TextureRegionDrawable(assetHelper.getAtlasRegion("images/council.pack:ui-waxseal") );
		waxsealStyle.down = new TextureRegionDrawable(assetHelper.getAtlasRegion("images/council.pack:ui-waxseal-select") );
		ui.rightBottomRightTable.add( ui.map.wax = new ImageButton(waxsealStyle) ).pad(10);
		ui.map.wax.addListener(new ClickListener() {
			@Override
			public void clicked(InputEvent event, float x, float y) {
				worldMap.turn();
				updateWeekUI();
			}
		});
		
	}
	
	/**
	 * Update all ui-elements that can be changed in a week (turn).
	 */
	private void updateWeekUI() {
		ui.map.currentYear.setText(String.valueOf(worldMap.getYear()));
		ui.map.currentWeek.setText(String.valueOf(worldMap.getWeek()));
	}
	
	private Actor createMap() {	
		ui.map.group = new Group();
		ui.map.group.setSize(320, 240);
		
		//add to buttongroup for one selection only
		ui.map.buttons = new ButtonGroup();
		
		//create areas
		//sibiu
		ui.map.areas.sibiu = new ImageButton(createStyle(worldMap.world.areas.sibiu));
		ui.map.areas.sibiu.setUserObject(worldMap.world.areas.sibiu);
		ui.map.areas.sibiu.setPosition(0, 120);
		ui.map.group.addActor(ui.map.areas.sibiu);
		ui.map.buttons.add(ui.map.areas.sibiu);
		//fagaras
		ui.map.areas.fagaras = new ImageButton(createStyle(worldMap.world.areas.fagaras));
		ui.map.areas.fagaras.setUserObject(worldMap.world.areas.fagaras);
		ui.map.areas.fagaras.setPosition(70, 135);
		ui.map.areas.fagaras.setChecked(true);
		ui.map.group.addActor(ui.map.areas.fagaras);
		ui.map.buttons.add(ui.map.areas.fagaras);
		//curtea
		ui.map.areas.curtea = new ImageButton(createStyle(worldMap.world.areas.curtea));
		ui.map.areas.curtea.setUserObject(worldMap.world.areas.curtea);
		ui.map.areas.curtea.setPosition(30, 80);
		ui.map.group.addActor(ui.map.areas.curtea);
		ui.map.buttons.add(ui.map.areas.curtea);
		//brasov
		ui.map.areas.brasov = new ImageButton(createStyle(worldMap.world.areas.brasov));
		ui.map.areas.brasov.setUserObject(worldMap.world.areas.brasov);
		ui.map.areas.brasov.setPosition(135, 130);
		ui.map.group.addActor(ui.map.areas.brasov);
		ui.map.buttons.add(ui.map.areas.brasov);
		//pitesti
		ui.map.areas.pitesti = new ImageButton(createStyle(worldMap.world.areas.pitesti));
		ui.map.areas.pitesti.setUserObject(worldMap.world.areas.pitesti);
		ui.map.areas.pitesti.setPosition(130, 85);
		ui.map.group.addActor(ui.map.areas.pitesti);
		ui.map.buttons.add(ui.map.areas.pitesti);
		//tirgo
		ui.map.areas.tirgo = new ImageButton(createStyle(worldMap.world.areas.tirgo));
		ui.map.areas.tirgo.setUserObject(worldMap.world.areas.tirgo);
		ui.map.areas.tirgo.setPosition(100, 45);
		ui.map.group.addActor(ui.map.areas.tirgo);
		ui.map.buttons.add(ui.map.areas.tirgo);
		//snagov
		ui.map.areas.snagov = new ImageButton(createStyle(worldMap.world.areas.snagov));
		ui.map.areas.snagov.setUserObject(worldMap.world.areas.snagov);
		ui.map.areas.snagov.setPosition(185, 70);
		ui.map.group.addActor(ui.map.areas.snagov);
		ui.map.buttons.add(ui.map.areas.snagov);
		//giurgiu
		ui.map.areas.giurgiu = new ImageButton(createStyle(worldMap.world.areas.giurgiu));
		ui.map.areas.giurgiu.setUserObject(worldMap.world.areas.giurgiu);
		ui.map.areas.giurgiu.setPosition(129, 0);
		ui.map.group.addActor(ui.map.areas.giurgiu);
		ui.map.buttons.add(ui.map.areas.giurgiu);
		//braila
		ui.map.areas.braila = new ImageButton(createStyle(worldMap.world.areas.braila));
		ui.map.areas.braila.setUserObject(worldMap.world.areas.braila);
		ui.map.areas.braila.setPosition(236, 100);
		ui.map.group.addActor(ui.map.areas.braila);
		ui.map.buttons.add(ui.map.areas.braila);
		//hirsova
		ui.map.areas.hirsova = new ImageButton(createStyle(worldMap.world.areas.hirsova));
		ui.map.areas.hirsova.setUserObject(worldMap.world.areas.hirsova);
		ui.map.areas.hirsova.setPosition(234, 75);
		ui.map.group.addActor(ui.map.areas.hirsova);
		ui.map.buttons.add(ui.map.areas.hirsova);
		//rasova
		ui.map.areas.rasova = new ImageButton(createStyle(worldMap.world.areas.rasova));
		ui.map.areas.rasova.setUserObject(worldMap.world.areas.rasova);
		ui.map.areas.rasova.setPosition(229, 54);
		ui.map.group.addActor(ui.map.areas.rasova);
		ui.map.buttons.add(ui.map.areas.rasova);
		//ostrov
		ui.map.areas.ostrov = new ImageButton(createStyle(worldMap.world.areas.ostrov));
		ui.map.areas.ostrov.setUserObject(worldMap.world.areas.ostrov);
		ui.map.areas.ostrov.setPosition(219, 30);
		ui.map.group.addActor(ui.map.areas.ostrov);
		ui.map.buttons.add(ui.map.areas.ostrov);
		
		for(Button button : ui.map.buttons.getButtons()) {
			button.addListener(new ClickListener() {
				@Override
				public void clicked(InputEvent event, float x, float y) {					
					System.out.println(((Area)event.getTarget().getUserObject()).getName());
				}
			});
		}
		
		//TODO: add bounds for clickable part for images
		return ui.map.group;
	}
	
	private Actor createTabs() {
		ui.tabs.table = new Table();
		ui.tabs.table.setBackground( new TextureRegionDrawable(assetHelper.getAtlasRegion("images/council.pack:ui-tab-training") ) );
		ui.tabs.table.add().width(60);
		ui.tabs.content = new Table();
		ui.tabs.table.add(ui.tabs.content).padTop(40);
		
		ui.tabs.training.table = new Table(); 
		ui.tabs.content.add(ui.tabs.training.table);
		
		/*FreeTypeFontGenerator generator = new FreeTypeFontGenerator(Gdx.files.internal("fonts/ANTQUA.TTF"));
		BitmapFont font = generator.generateFont(new FreeTypeFontGenerator.FreeTypeFontParameter());
		Label.LabelStyle style = new Label.LabelStyle(font, Color.WHITE);*/
		
		//ui.tabs.training.table.add(new Label("test", style));		
		
		//content.add(new Label("test", new Label.LabelStyle(new BitmapFont(), Color.WHITE))).top();
		//Image stat = new Image(new TextureRegionDrawable(assetHelper.getAtlasRegion("images/council.pack:ui-level-blue") ) ) ;
		//content.add(stat);
		
		return ui.tabs.table;
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
		Table rightBottonTable;
		Table rightBottomRightTable;
		
		Map map = new Map();
		Tabs tabs = new Tabs();
		
		private static final class Map {
			Group group;
			Areas areas = new Areas();
			ButtonGroup buttons;
			Stats stats = new Stats();
			Table statsTable;
			Label year, currentYear;
			Label week, currentWeek;
			Button wax;
			
			private static final class Areas{
				ImageButton sibiu, fagaras, curtea, brasov, pitesti, tirgo, snagov, giurgiu, braila, hirsova, rasova, ostrov;
			}
			
			private static final class Stats {
				Label currentGold, weekGold;
				Label currentWood, weekWood;
				Label currentFood, weekFood;
				Label currentMen, weekMen;
				Label currentArmy;
			}
		}
		
		private static final class Tabs {
			Table table;
			Table content;
			
			//training
			Training training = new Training();
			
			private static final class Training {
				Table table;
				Unit swordsmen,	crossbowsoldiers, knight, juggernaut, catapult, cannon, spy;
				
				private static final class Unit {
					ImageButton button;
					Label gold;
					Label turns;
					Image strenght, accurancy, defance, stamina, speed, range;
				}
				
			}
			
			//movement
			//construction
			//information
			//administration
		}
	}
}
