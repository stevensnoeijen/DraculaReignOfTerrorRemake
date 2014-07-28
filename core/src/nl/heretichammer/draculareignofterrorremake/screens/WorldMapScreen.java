package nl.heretichammer.draculareignofterrorremake.screens;

import nl.heretichammer.draculareignofterrorremake.ai.AIPlayer;
import nl.heretichammer.draculareignofterrorremake.map.Area;
import nl.heretichammer.draculareignofterrorremake.map.World;
import nl.heretichammer.draculareignofterrorremake.map.WorldMap;
import nl.heretichammer.draculareignofterrorremake.producers.troopproducer.TroopProducer;
import nl.heretichammer.draculareignofterrorremake.team.Player;
import nl.heretichammer.draculareignofterrorremake.team.Team;
import nl.heretichammer.draculareignofterrorremake.unit.Unit;
import nl.heretichammer.draculareignofterrorremake.utils.AssetHelper;

import com.badlogic.gdx.Gdx;
import com.badlogic.gdx.assets.AssetManager;
import com.badlogic.gdx.graphics.Color;
import com.badlogic.gdx.graphics.g2d.TextureAtlas;
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
import com.badlogic.gdx.scenes.scene2d.utils.Align;
import com.badlogic.gdx.scenes.scene2d.utils.ClickListener;
import com.badlogic.gdx.scenes.scene2d.utils.Drawable;
import com.badlogic.gdx.scenes.scene2d.utils.TextureRegionDrawable;

public class WorldMapScreen extends Scene2DScreen {
	
	private AssetManager assetManager = new AssetManager();
	private AssetHelper assetHelper = new AssetHelper(assetManager);
	
	private Skin skin;
	private final UI ui = new UI();
	
	private Player player;
	private WorldMap worldMap;
	
	private static final float FONT_SMALL = .8f;
	
	public WorldMapScreen() {
		World world = new World();
		worldMap = new WorldMap(world);
		
		player = new Player(world.findTeamByName("transylvania"));
		player.setSelectedArea(worldMap.getAreas().fagaras);
		new AIPlayer(world.findTeamByName("turks"));//will add itself to turks team
	}
	
	@Override
	public void show() {
		super.show();
		assetManager.load("images/council.pack", TextureAtlas.class);
		assetManager.load("uiskin.json", Skin.class);
		assetManager.finishLoading();
		
		skin = assetManager.get("uiskin.json", Skin.class);
		stage.addActor(new Image(assetHelper.getAtlasTexture("images/council.pack:ui-scroll")));//background
		
		Actor tab = createTab();
		tab.setPosition(25, 50);
		stage.addActor(tab);

		Actor map = createMap();
		map.setPosition(280, 250);
		stage.addActor(map);
		
		Actor resources = createResources();
		resources.setPosition(300, 50);
		stage.addActor(resources);
		
		//create year
		Label year = new Label("Anno Domini", skin, "bold");
		year.setColor(Color.BLACK);
		year.setPosition(510, 210);
		stage.addActor(year);

		ui.currentYear = new Label("0", skin);
		ui.currentYear.setFontScale(FONT_SMALL);
		ui.currentYear.setPosition(550, 190);
		stage.addActor(ui.currentYear);
		
		//create week
		Label week = new Label("Week", skin, "bold");
		week.setColor(Color.BLACK);
		week.setPosition(540, 165);
		stage.addActor(week);
		
		ui.currentWeek = new Label("0", skin);
		ui.currentWeek.setFontScale(FONT_SMALL);
		ui.currentWeek.setPosition(560, 150);
		stage.addActor(ui.currentWeek);
		
		
		ImageButton.ImageButtonStyle waxsealStyle = new ImageButton.ImageButtonStyle();
		waxsealStyle.up = new TextureRegionDrawable(assetHelper.getAtlasRegion("images/council.pack:ui-waxseal") );
		waxsealStyle.down = new TextureRegionDrawable(assetHelper.getAtlasRegion("images/council.pack:ui-waxseal-select") );
		Button waxButton = new ImageButton(waxsealStyle);
		waxButton.setPosition(525, 55);
		waxButton.addListener(new ClickListener() {
			@Override
			public void clicked(InputEvent event, float x, float y) {
				player.turnDone();
				worldMap.turn();
				updateWeekUI();
				updateResourcesUI();
			}
		});
		stage.addActor(waxButton);
		
		updateWeekUI();//set texts for week and year
		updateResourcesUI();
	}
	
	/**
	 * Update all ui-elements that can be changed in a week (turn).
	 */
	private void updateWeekUI() {
		ui.currentYear.setText(String.valueOf(worldMap.getYear()));
		ui.currentWeek.setText(String.valueOf(worldMap.getWeek()));
	}
	
	public void updateResourcesUI() {
		final Team playersTeam = player.getTeam();
		
		//gold
		ui.resources.currentGold.setText( String.valueOf( playersTeam.getItemAmount("gold") ) );
		ui.resources.incomeGold.setText( incomeToString( playersTeam.getIncome("gold") ) );
		//wood
		ui.resources.currentWood.setText( String.valueOf( playersTeam.getItemAmount("wood") ) );
		ui.resources.incomeWood.setText( incomeToString( playersTeam.getIncome("wood") ) );
		//food
		ui.resources.currentFood.setText( String.valueOf( playersTeam.getItemAmount("food") ) );
		ui.resources.incomeFood.setText( incomeToString( playersTeam.getIncome("food") ) );
		//men
		ui.resources.currentMen.setText( String.valueOf( playersTeam.getItemAmount("men") ) );
		ui.resources.incomeMen.setText( incomeToString( playersTeam.getIncome("men") ) );
		//army
		ui.resources.currentArmy.setText( String.valueOf( playersTeam.getUnits() ) );
		
	}
	
	/**
	 * Adds +, - or nothing in front of the income and returns it as a {@link String}.
	 * @param income
	 * @return
	 */
	public static String incomeToString(int income) {
		if(income > 0 ) {
			return "+" + income;
		}else if(income < 0) {
			return "-" + income;
		}else {//is 0
			return String.valueOf(income);
		}
	}
	
	private Actor createMap() {	
		Group areaGroup = new Group();
		areaGroup.setSize(320, 240);
		
		//add to buttongroup for one selection only
		ButtonGroup areasButtonGroup = new ButtonGroup();
		
		//create areas
		//sibiu
		ui.areas.sibiu = new ImageButton(createStyle(worldMap.world.areas.sibiu));
		ui.areas.sibiu.setUserObject(worldMap.world.areas.sibiu);
		ui.areas.sibiu.setPosition(0, 120);
		areaGroup.addActor(ui.areas.sibiu);
		areasButtonGroup.add(ui.areas.sibiu);
		//fagaras
		ui.areas.fagaras = new ImageButton(createStyle(worldMap.world.areas.fagaras));
		ui.areas.fagaras.setUserObject(worldMap.world.areas.fagaras);
		ui.areas.fagaras.setPosition(70, 135);
		ui.areas.fagaras.setChecked(true);
		areaGroup.addActor(ui.areas.fagaras);
		areasButtonGroup.add(ui.areas.fagaras);
		//curtea
		ui.areas.curtea = new ImageButton(createStyle(worldMap.world.areas.curtea));
		ui.areas.curtea.setUserObject(worldMap.world.areas.curtea);
		ui.areas.curtea.setPosition(30, 80);
		areaGroup.addActor(ui.areas.curtea);
		areasButtonGroup.add(ui.areas.curtea);
		//brasov
		ui.areas.brasov = new ImageButton(createStyle(worldMap.world.areas.brasov));
		ui.areas.brasov.setUserObject(worldMap.world.areas.brasov);
		ui.areas.brasov.setPosition(135, 130);
		areaGroup.addActor(ui.areas.brasov);
		areasButtonGroup.add(ui.areas.brasov);
		//pitesti
		ui.areas.pitesti = new ImageButton(createStyle(worldMap.world.areas.pitesti));
		ui.areas.pitesti.setUserObject(worldMap.world.areas.pitesti);
		ui.areas.pitesti.setPosition(130, 85);
		areaGroup.addActor(ui.areas.pitesti);
		areasButtonGroup.add(ui.areas.pitesti);
		//tirgo
		ui.areas.tirgo = new ImageButton(createStyle(worldMap.world.areas.tirgo));
		ui.areas.tirgo.setUserObject(worldMap.world.areas.tirgo);
		ui.areas.tirgo.setPosition(100, 45);
		areaGroup.addActor(ui.areas.tirgo);
		areasButtonGroup.add(ui.areas.tirgo);
		//snagov
		ui.areas.snagov = new ImageButton(createStyle(worldMap.world.areas.snagov));
		ui.areas.snagov.setUserObject(worldMap.world.areas.snagov);
		ui.areas.snagov.setPosition(185, 70);
		areaGroup.addActor(ui.areas.snagov);
		areasButtonGroup.add(ui.areas.snagov);
		//giurgiu
		ui.areas.giurgiu = new ImageButton(createStyle(worldMap.world.areas.giurgiu));
		ui.areas.giurgiu.setUserObject(worldMap.world.areas.giurgiu);
		ui.areas.giurgiu.setPosition(129, 0);
		areaGroup.addActor(ui.areas.giurgiu);
		areasButtonGroup.add(ui.areas.giurgiu);
		//braila
		ui.areas.braila = new ImageButton(createStyle(worldMap.world.areas.braila));
		ui.areas.braila.setUserObject(worldMap.world.areas.braila);
		ui.areas.braila.setPosition(236, 100);
		areaGroup.addActor(ui.areas.braila);
		areasButtonGroup.add(ui.areas.braila);
		//hirsova
		ui.areas.hirsova = new ImageButton(createStyle(worldMap.world.areas.hirsova));
		ui.areas.hirsova.setUserObject(worldMap.world.areas.hirsova);
		ui.areas.hirsova.setPosition(234, 75);
		areaGroup.addActor(ui.areas.hirsova);
		areasButtonGroup.add(ui.areas.hirsova);
		//rasova
		ui.areas.rasova = new ImageButton(createStyle(worldMap.world.areas.rasova));
		ui.areas.rasova.setUserObject(worldMap.world.areas.rasova);
		ui.areas.rasova.setPosition(229, 54);
		areaGroup.addActor(ui.areas.rasova);
		areasButtonGroup.add(ui.areas.rasova);
		//ostrov
		ui.areas.ostrov = new ImageButton(createStyle(worldMap.world.areas.ostrov));
		ui.areas.ostrov.setUserObject(worldMap.world.areas.ostrov);
		ui.areas.ostrov.setPosition(219, 30);
		areaGroup.addActor(ui.areas.ostrov);
		areasButtonGroup.add(ui.areas.ostrov);
		
		for(Button button : areasButtonGroup.getButtons()) {
			button.addListener(new ClickListener() {
				@Override
				public void clicked(InputEvent event, float x, float y) {					
					player.setSelectedArea((Area)event.getTarget().getUserObject());
				}
			});
		}
		
		//TODO: add bounds for clickable part for images
		return areaGroup;
	}
	
	private Actor createTab() {
		Table main = new Table();
		main.setHeight(400);
		main.setBackground( assetHelper.getDrawable("images/council.pack:ui-tab-training") );
		
		Table buttons = new Table(skin);
		buttons.setSize(36, 400);
		main.add(buttons).top().padTop(31);
		//create invisable buttons for tabs
		//training
		ImageButton trainingTabButton = new ImageButton((Drawable)null);
		trainingTabButton.addListener(new ClickListener() {
			@Override
			public void clicked(InputEvent event, float x, float y) {
				System.out.println("clicked");
			}
		});
		buttons.add(trainingTabButton).size(50, 67).row();		
		//movement
		ImageButton movementTabButton = new ImageButton((Drawable)null);
		movementTabButton.addListener(new ClickListener() {
			@Override
			public void clicked(InputEvent event, float x, float y) {
				System.out.println("clicked");
			}
		});
		buttons.add(movementTabButton).size(50, 67).row();
		//construction
		ImageButton constructionTabButton = new ImageButton((Drawable)null);
		constructionTabButton.addListener(new ClickListener() {
			@Override
			public void clicked(InputEvent event, float x, float y) {
				System.out.println("clicked");
			}
		});
		buttons.add(constructionTabButton).size(50, 67).row();
		//information
		ImageButton informationTabButton = new ImageButton((Drawable)null);
		informationTabButton.addListener(new ClickListener() {
			@Override
			public void clicked(InputEvent event, float x, float y) {
				System.out.println("clicked");
			}
		});
		buttons.add(informationTabButton).size(50, 67).row();
		//administration
		ImageButton administrationTabButton = new ImageButton((Drawable)null);
		administrationTabButton.addListener(new ClickListener() {
			@Override
			public void clicked(InputEvent event, float x, float y) {
				System.out.println("clicked");
			}
		});
		buttons.add(administrationTabButton).size(50, 67).row();
		
		Group right = new Group();
		right.setSize(200, 400);
		main.add(right);
		
		Table trainingTable = new Table(skin);
		trainingTable.setPosition(97, 197);
		right.addActor(trainingTable);
		
		final Area area = player.getSelectedArea();
		for(TroopProducer troopProducer : area.troopProducerManager.getProducers()) {
			Unit.UnitData unitData = troopProducer.getUnitData();
			
			trainingTable.row();
			
			ImageButton trainButton = new ImageButton(createTrainingImageButtonStyle(troopProducer.getTroopName()));
			trainButton.addListener(new ClickListener() {
				@Override
				public void clicked(InputEvent event, float x, float y) {
					
				}
			});
			trainingTable.add(trainButton);
			//label constants
			final float FONTSCALE = 0.8f;
			final float WIDTH = 16, HEIGHT = 29;
			final float SPACE = 1;
			//troop costs
			//gold
			Label goldCostLabel = new Label(String.valueOf(troopProducer.findCost("gold").amount), skin);
			goldCostLabel.setFontScale(FONTSCALE);
			goldCostLabel.setAlignment(Align.center);
			trainingTable.add(goldCostLabel).size(WIDTH, HEIGHT).space(SPACE);
			//turns
			Label turnsCostLabel = new Label(String.valueOf(troopProducer.getTurnCost()), skin);
			turnsCostLabel.setFontScale(FONTSCALE);
			turnsCostLabel.setAlignment(Align.center);
			trainingTable.add(turnsCostLabel).size(WIDTH, HEIGHT).space(SPACE);
			//unit attributes
			//strenght
			Label trainingCostLabel = new Label(String.valueOf(unitData.attributes.strenght), skin);
			trainingCostLabel.setFontScale(FONTSCALE);
			trainingCostLabel.setAlignment(Align.center);
			trainingTable.add(trainingCostLabel).size(WIDTH, HEIGHT).space(SPACE);
			//accuracy
			Label accuracyCostLabel = new Label(String.valueOf(unitData.attributes.accuracy), skin);
			accuracyCostLabel.setFontScale(FONTSCALE);
			accuracyCostLabel.setAlignment(Align.center);
			trainingTable.add(accuracyCostLabel).size(WIDTH, HEIGHT).space(SPACE);
			//defance
			Label defanceCostLabel = new Label(String.valueOf(unitData.attributes.defance), skin);
			defanceCostLabel.setFontScale(FONTSCALE);
			defanceCostLabel.setAlignment(Align.center);
			trainingTable.add(defanceCostLabel).size(WIDTH, HEIGHT).space(SPACE);
			//stamina
			Label staminaCostLabel = new Label(String.valueOf(unitData.attributes.stamina), skin);
			staminaCostLabel.setFontScale(FONTSCALE);
			staminaCostLabel.setAlignment(Align.center);
			trainingTable.add(staminaCostLabel).size(WIDTH, HEIGHT).space(SPACE);
			//speed
			Label speedCostLabel = new Label(String.valueOf(unitData.attributes.speed), skin);
			speedCostLabel.setFontScale(FONTSCALE);
			speedCostLabel.setAlignment(Align.center);
			trainingTable.add(speedCostLabel).size(WIDTH, HEIGHT).space(SPACE);
			//range
			Label rangeCostLabel = new Label(String.valueOf(unitData.attributes.range), skin);
			rangeCostLabel.setFontScale(FONTSCALE);
			rangeCostLabel.setAlignment(Align.center);
			trainingTable.add(rangeCostLabel).size(WIDTH, HEIGHT).space(SPACE);
		}
		main.pack();
		return main;
	}
	
	private Actor createResources() {
		//constants
		final float LABEL_WIDTH = 36;
		final float LABEL_FONT = .8f;
		
		Group group = new Group();
		
		Image background = new Image( assetHelper.getDrawable("images/council.pack:ui-panel-stats") );
		group.addActor(background);		
		
		//stats for resources
		Table resourcesTable = new Table(skin);
		resourcesTable.setPosition(8, 95);
		//resourcesTable.debug();
		group.addActor(resourcesTable);
		
		resourcesTable.row().height(12).spaceBottom(2);
		resourcesTable.add( ui.resources.currentGold = new Label("0", skin) ).width(LABEL_WIDTH).spaceRight(2);
		ui.resources.currentGold.setFontScale(LABEL_FONT);
		ui.resources.currentGold.setAlignment(Align.center);
		resourcesTable.add( ui.resources.currentWood = new Label("0", skin) ).width(LABEL_WIDTH).spaceRight(2);
		ui.resources.currentWood.setFontScale(LABEL_FONT);
		ui.resources.currentWood.setAlignment(Align.center);
		resourcesTable.add( ui.resources.currentFood = new Label("0", skin) ).width(LABEL_WIDTH).spaceRight(2);
		ui.resources.currentFood.setFontScale(LABEL_FONT);
		ui.resources.currentFood.setAlignment(Align.center);
		resourcesTable.add( ui.resources.currentMen = new Label("0", skin) ).width(LABEL_WIDTH).spaceRight(2);
		ui.resources.currentMen.setFontScale(LABEL_FONT);
		ui.resources.currentMen.setAlignment(Align.center);
		resourcesTable.add( ui.resources.currentArmy = new Label("0", skin) ).width(LABEL_WIDTH).spaceRight(2);
		ui.resources.currentArmy.setFontScale(LABEL_FONT);
		ui.resources.currentArmy.setAlignment(Align.center);
		
		resourcesTable.row().height(12);
		resourcesTable.add( ui.resources.incomeGold = new Label("0", skin) ).width(LABEL_WIDTH).spaceRight(2);
		ui.resources.incomeGold.setFontScale(LABEL_FONT);
		ui.resources.incomeGold.setAlignment(Align.center);
		resourcesTable.add( ui.resources.incomeWood = new Label("0", skin) ).width(LABEL_WIDTH).spaceRight(2);
		ui.resources.incomeWood.setFontScale(LABEL_FONT);
		ui.resources.incomeWood.setAlignment(Align.center);
		resourcesTable.add( ui.resources.incomeFood = new Label("0", skin) ).width(LABEL_WIDTH).spaceRight(2);
		ui.resources.incomeFood.setFontScale(LABEL_FONT);
		ui.resources.incomeFood.setAlignment(Align.center);
		resourcesTable.add( ui.resources.incomeMen = new Label("0", skin) ).width(LABEL_WIDTH).spaceRight(2);
		ui.resources.incomeMen.setFontScale(LABEL_FONT);
		ui.resources.incomeMen.setAlignment(Align.center);
		resourcesTable.pack();

		return group;
	}
	
	private ImageButton.ImageButtonStyle createTrainingImageButtonStyle(String name){
		String stylePrefixName = "images/council.pack:ui-button-";
		
		ImageButton.ImageButtonStyle style = new ImageButton.ImageButtonStyle();
		style.up = assetHelper.getDrawable(stylePrefixName + name);
		style.down = assetHelper.getDrawable(stylePrefixName + name + "-click");
		style.disabled = assetHelper.getDrawable(stylePrefixName + name + "-disabled");		
		
		return style;
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
		Areas areas = new Areas();
		Resources resources = new Resources();
		
		Label currentYear;
		Label currentWeek;
		
		private static final class Areas{
			ImageButton sibiu, fagaras, curtea, brasov, pitesti, tirgo, snagov, giurgiu, braila, hirsova, rasova, ostrov;
		}
		
		private static final class Resources {
			Label currentGold, incomeGold;
			Label currentWood, incomeWood;
			Label currentFood, incomeFood;
			Label currentMen, incomeMen;
			Label currentArmy;
		}
		
		private static final class Tabs {
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
