package nl.heretichammer.draculareignofterrorremake.screens;

import java.util.LinkedList;
import java.util.List;

import nl.heretichammer.draculareignofterrorremake.Player;
import nl.heretichammer.draculareignofterrorremake.ai.AIPlayer;
import nl.heretichammer.draculareignofterrorremake.models.Area;
import nl.heretichammer.draculareignofterrorremake.models.Resource;
import nl.heretichammer.draculareignofterrorremake.models.Troop;
import nl.heretichammer.draculareignofterrorremake.models.World;
import nl.heretichammer.draculareignofterrorremake.models.buildings.Building;
import nl.heretichammer.draculareignofterrorremake.models.events.DoneEvent;
import nl.heretichammer.draculareignofterrorremake.models.events.StartedEvent;
import nl.heretichammer.draculareignofterrorremake.models.producer.TroopProducer;
import nl.heretichammer.draculareignofterrorremake.models.team.Team;
import nl.heretichammer.draculareignofterrorremake.models.units.Unit;
import nl.heretichammer.draculareignofterrorremake.models.upgraders.ArchitectureUpgrader;
import nl.heretichammer.draculareignofterrorremake.models.upgraders.ArmamentUpgrader;
import nl.heretichammer.draculareignofterrorremake.utils.AssetHelper;
import nl.heretichammer.draculareignofterrorremake.utils.ActorLoader;

import com.badlogic.gdx.Gdx;
import com.badlogic.gdx.assets.AssetManager;
import com.badlogic.gdx.assets.loaders.resolvers.InternalFileHandleResolver;
import com.badlogic.gdx.audio.Music;
import com.badlogic.gdx.audio.Sound;
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
import com.badlogic.gdx.utils.Disposable;
import com.google.common.eventbus.Subscribe;

public class CouncilScreen extends Scene2DScreen {
	
	private static final String LEVEL_DIVIDER = "/";

	private List<Disposable> disposables = new LinkedList<Disposable>();
	
	private AssetManager assetManager = new AssetManager();
	private AssetHelper assetHelper = new AssetHelper(assetManager);
	
	private Skin skin;
	private final UI ui = new UI();
	
	private Player player;
	private World world;
	private Area selectedArea;
	
	private static final int TAB_TRAINING = 0, TAB_MOVEMENTS = 1, TAB_CONSTRUCTIONS = 2, TAB_ADMINISTRATION = 3, TAB_INFORMATION = 4;
	private int currentTab = TAB_TRAINING;
	
	private static final float FONT_SMALL = .8f;
	
	public CouncilScreen() {
		assetManager.setLoader(Actor.class, new ActorLoader(new InternalFileHandleResolver()));
		World world = new World();
		world = new World();
		
		player = new Player(Team.transylvanians);
		new AIPlayer(world.findTeamByName("turks"));//will add itself to turks team
		selectedArea = world.getArea("fagaras");
	}
	
	public void setSelectedArea(Area selectedArea) {
		this.selectedArea = selectedArea;
		ui.location.setText("In " + selectedArea.getName());
		showTab(currentTab);
	}
	
	@Override
	public void show() {
		super.show();
		assetManager.load("image/council.pack", TextureAtlas.class);
		assetManager.load("skin/uiskin.json", Skin.class);
		assetManager.load("sound/click.ogg", Sound.class);
		assetManager.load("music/council2.mp3", Music.class);
		assetManager.load("sound/upgrading armerment.ogg", Sound.class);
		assetManager.load("sound/upgrading architecture.ogg", Sound.class);
		assetManager.load("layout/CouncilScreen.xml", Actor.class);
		assetManager.finishLoading();
		
		skin = assetManager.get("skin/uiskin.json", Skin.class); 
		stage.addActor( assetManager.get("layout/CouncilScreen.xml", Actor.class) );//background
		
		/*
		Actor tab = createTabPane();
		tab.setPosition(25, 50);		
		stage.addActor(tab);
		showTrainingTab();

		Actor map = createMap();
		map.setPosition(280, 250);
		stage.addActor(map);
		
		Actor resources = createResources();
		resources.setPosition(300, 50);
		stage.addActor(resources);
		*/
		
		stage.getRoot().findActor("wax").addListener(new ClickListener() {
			@Override
			public void clicked(InputEvent event, float x, float y) {
				world.week();
				updateUI();
			}
		});
		//updateUI();
	}
	
	private void updateUI() {
		updateWeekUI();//set texts for week and year
		updateResourcesUI();
		showTab(currentTab);
		//update training-buttons
	}
	
	/**
	 * Update all ui-elements that can be changed in a week (turn).
	 */
	private void updateWeekUI() {
		ui.currentYear.setText(String.valueOf(world.getYear()));
		ui.currentWeek.setText(String.valueOf(world.getWeek()));
	}
	
	public void updateResourcesUI() {		
		//gold
		ui.resources.currentGold.setText( String.valueOf( selectedArea.getResourceAmount(Resource.GOLD) ) );
		ui.resources.incomeGold.setText( incomeToString( selectedArea.getResourceIncome(Resource.GOLD) ) );
		//wood
		ui.resources.currentWood.setText( String.valueOf( selectedArea.getResourceAmount(Resource.WOOD)  ) );
		ui.resources.incomeWood.setText( incomeToString( selectedArea.getResourceIncome(Resource.WOOD) ) );
		//food
		ui.resources.currentFood.setText( String.valueOf( selectedArea.getResourceAmount(Resource.FOOD)  ) );
		ui.resources.incomeFood.setText( incomeToString( selectedArea.getResourceIncome(Resource.FOOD)  ) );
		//men
		ui.resources.currentMen.setText( String.valueOf( selectedArea.getResourceAmount(Resource.MEN)  ) );
		ui.resources.incomeMen.setText( incomeToString( selectedArea.getResourceIncome(Resource.MEN)  ) );
		//army
		ui.resources.currentArmy.setText( String.valueOf( selectedArea.getArmy() ) );
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
		ui.areas.sibiu = new ImageButton(createStyle(world.getArea("sibiu")));
		ui.areas.sibiu.setUserObject(world.getArea("sibiu"));
		ui.areas.sibiu.setPosition(0, 120);
		areaGroup.addActor(ui.areas.sibiu);
		areasButtonGroup.add(ui.areas.sibiu);
		//fagaras
		ui.areas.fagaras = new ImageButton(createStyle(world.getArea("fagaras")));
		ui.areas.fagaras.setUserObject(world.getArea("fagaras"));
		ui.areas.fagaras.setPosition(70, 135);
		ui.areas.fagaras.setChecked(true);
		areaGroup.addActor(ui.areas.fagaras);
		areasButtonGroup.add(ui.areas.fagaras);
		//curtea
		ui.areas.curtea = new ImageButton(createStyle(world.getArea("curtea")));
		ui.areas.curtea.setUserObject(world.getArea("curtea"));
		ui.areas.curtea.setPosition(30, 80);
		areaGroup.addActor(ui.areas.curtea);
		areasButtonGroup.add(ui.areas.curtea);
		//brasov
		ui.areas.brasov = new ImageButton(createStyle(world.getArea("brasov")));
		ui.areas.brasov.setUserObject(world.getArea("brasov"));
		ui.areas.brasov.setPosition(135, 130);
		areaGroup.addActor(ui.areas.brasov);
		areasButtonGroup.add(ui.areas.brasov);
		//pitesti
		ui.areas.pitesti = new ImageButton(createStyle(world.getArea("pitesti")));
		ui.areas.pitesti.setUserObject(world.getArea("pitesti"));
		ui.areas.pitesti.setPosition(130, 85);
		areaGroup.addActor(ui.areas.pitesti);
		areasButtonGroup.add(ui.areas.pitesti);
		//tirgo
		ui.areas.tirgo = new ImageButton(createStyle(world.getArea("tirgo")));
		ui.areas.tirgo.setUserObject(world.getArea("tirgo"));
		ui.areas.tirgo.setPosition(100, 45);
		areaGroup.addActor(ui.areas.tirgo);
		areasButtonGroup.add(ui.areas.tirgo);
		//snagov
		ui.areas.snagov = new ImageButton(createStyle(world.getArea("snagov")));
		ui.areas.snagov.setUserObject(world.getArea("snagov"));
		ui.areas.snagov.setPosition(185, 70);
		areaGroup.addActor(ui.areas.snagov);
		areasButtonGroup.add(ui.areas.snagov);
		//giurgiu
		ui.areas.giurgiu = new ImageButton(createStyle(world.getArea("giurgiu")));
		ui.areas.giurgiu.setUserObject(world.getArea("giurgiu"));
		ui.areas.giurgiu.setPosition(129, 0);
		areaGroup.addActor(ui.areas.giurgiu);
		areasButtonGroup.add(ui.areas.giurgiu);
		//braila
		ui.areas.braila = new ImageButton(createStyle(world.getArea("braila")));
		ui.areas.braila.setUserObject(world.getArea("braila"));
		ui.areas.braila.setPosition(236, 100);
		areaGroup.addActor(ui.areas.braila);
		areasButtonGroup.add(ui.areas.braila);
		//hirsova
		ui.areas.hirsova = new ImageButton(createStyle(world.getArea("hirsova")));
		ui.areas.hirsova.setUserObject(world.getArea("hirsova"));
		ui.areas.hirsova.setPosition(234, 75);
		areaGroup.addActor(ui.areas.hirsova);
		areasButtonGroup.add(ui.areas.hirsova);
		//rasova
		ui.areas.rasova = new ImageButton(createStyle(world.getArea("rasova")));
		ui.areas.rasova.setUserObject(world.getArea("rasova"));
		ui.areas.rasova.setPosition(229, 54);
		areaGroup.addActor(ui.areas.rasova);
		areasButtonGroup.add(ui.areas.rasova);
		//ostrov
		ui.areas.ostrov = new ImageButton(createStyle(world.getArea("ostrov")));
		ui.areas.ostrov.setUserObject(world.getArea("ostrov"));
		ui.areas.ostrov.setPosition(219, 30);
		areaGroup.addActor(ui.areas.ostrov);
		areasButtonGroup.add(ui.areas.ostrov);
		
		for(Button button : areasButtonGroup.getButtons()) {
			button.addListener(new ClickListener() {
				@Override
				public void clicked(InputEvent event, float x, float y) {					
					setSelectedArea((Area)event.getTarget().getUserObject());
				}
			});
		}
		
		//TODO: add bounds for clickable part for images
		return areaGroup;
	}
	
	private Actor createTabPane() {
		Table main = new Table();
		main.setName("tab.pane");
		main.setHeight(400);
		
		//create tab-buttons
		Table buttons = new Table(skin);
		buttons.setSize(36, 400);
		main.add(buttons).top().padTop(31);
		//create invisable buttons for tabs
		//training
		ImageButton trainingTabButton = new ImageButton((Drawable)null);
		trainingTabButton.addListener(new ClickListener() {
			@Override
			public void clicked(InputEvent event, float x, float y) {
				showTab(TAB_TRAINING);
			}
		});
		buttons.add(trainingTabButton).size(50, 67).row();		
		//movement
		ImageButton movementTabButton = new ImageButton((Drawable)null);
		movementTabButton.addListener(new ClickListener() {
			@Override
			public void clicked(InputEvent event, float x, float y) {
				showTab(TAB_MOVEMENTS);
			}
		});
		buttons.add(movementTabButton).size(50, 67).row();
		//construction
		ImageButton constructionTabButton = new ImageButton((Drawable)null);
		constructionTabButton.addListener(new ClickListener() {
			@Override
			public void clicked(InputEvent event, float x, float y) {
				showTab(TAB_CONSTRUCTIONS);
			}
		});
		buttons.add(constructionTabButton).size(50, 67).row();
		//information
		ImageButton informationTabButton = new ImageButton((Drawable)null);
		informationTabButton.addListener(new ClickListener() {
			@Override
			public void clicked(InputEvent event, float x, float y) {
				showTab(TAB_INFORMATION);
			}
		});
		buttons.add(informationTabButton).size(50, 67).row();
		//administration
		ImageButton administrationTabButton = new ImageButton((Drawable)null);
		administrationTabButton.addListener(new ClickListener() {
			@Override
			public void clicked(InputEvent event, float x, float y) {
				showTab(TAB_ADMINISTRATION);
			}
		});
		buttons.add(administrationTabButton).size(50, 67).row();
		
		Group right = new Group();
		right.setName("tab.container");
		right.setSize(200, 400);
		main.add(right);
		main.pack();
		
		//add info labels
		ui.location = new Label("In Fagaras", skin);
		ui.location.setFontScale(0.8f);
		ui.location.setPosition(55, 340);
		ui.location.toFront();
		right.addActor(ui.location);
		
		//ui.info
		ui.info = new Label("info", skin);
		ui.info.setFontScale(0.8f);
		ui.info.setPosition(15, 30);
		right.addActor(ui.info);
		ui.info.toFront();
		
		return main;
	}
	
	/**
	 * 
	 * @param tab to set to {@value #TAB_TRAINING}, {@value #TAB_MOVEMENTS}, {@value #TAB_CONSTRUCTIONS}, {@value #TAB_ADMINISTRATION} or {@value #TAB_INFORMATION}.
	 */
	private void showTab(int tab) {
		if(tab == TAB_TRAINING || tab == TAB_MOVEMENTS || tab == TAB_CONSTRUCTIONS || tab == TAB_ADMINISTRATION || tab == TAB_INFORMATION) {
			currentTab = tab;
			switch(currentTab) {
			case TAB_TRAINING:
				showTrainingTab();
				break;
			case TAB_MOVEMENTS:
				showMovementsTab();
				break;
			case TAB_CONSTRUCTIONS:
				showConstructionsTab();
				break;
			case TAB_ADMINISTRATION:
				showAdministrationTab();
				break;
			case TAB_INFORMATION:
				showInformationTab();
				break;
			}
		}else {
			throw new IllegalArgumentException();
		}
	}
	
	private void showTrainingTab() {
		clearTabContainer();
		setTabBackground(assetHelper.getDrawable("image/council.pack:ui-tab-training"));
		
		Table trainingTable = new Table(skin);
		trainingTable.setPosition(97, 197);
		Group tabContrainer = (Group)stage.getRoot().findActor("tab.container");
		tabContrainer.addActor(trainingTable);
		
		for(final TroopProducer<?> troopProducer : selectedArea.getTroopProducers()) {
			boolean visable = true;
			trainingTable.row();
			
			final ImageButton trainButton = new ImageButton(createTrainingImageButtonStyle(troopProducer.getTroopName()));
			if(!troopProducer.isAccessable()) {
				visable = false;
				trainButton.setVisible(visable);
			}else if(troopProducer.isStarted()) {
				trainButton.getStyle().imageDisabled = assetHelper.getDrawable("image/council.pack:ui-button-overlay-wait-full");//add hourglass
				trainButton.setDisabled(true);
			}else if(!troopProducer.canSupplyCost()) {
				trainButton.setDisabled(true);//only disable
			}
			trainButton.addListener(new ClickListener() {
				@Override
				public void clicked(InputEvent event, float x, float y) {
					
				}
			});
			trainButton.addListener(new ClickListener() {
				@Override
				public void clicked(InputEvent event, float x, float y) {
					troopProducer.start();
					updateResourcesUI();
				}
			});
			troopProducer.register(new Object(){
				@Subscribe
				public void on(StartedEvent event){
					trainButton.getStyle().imageDisabled = assetHelper.getDrawable("image/council.pack:ui-button-overlay-wait-full");
					trainButton.setDisabled(true);
				}
				
				@Subscribe
				public void on(DoneEvent event){
					trainButton.setDisabled(false);
				}
			});
			
			trainingTable.add(trainButton);
			//label constants
			final float FONTSCALE = 0.8f;
			final float WIDTH = 16, HEIGHT = 29;
			final float SPACE = 1;
			//troop costs
			//gold
			Label goldCostLabel = new Label(String.valueOf(troopProducer.getResourceCost(Resource.GOLD)), skin);
			goldCostLabel.setFontScale(FONTSCALE);
			goldCostLabel.setAlignment(Align.center);
			goldCostLabel.setVisible(visable);
			trainingTable.add(goldCostLabel).size(WIDTH, HEIGHT).space(SPACE);
			//turns
			Label turnsCostLabel = new Label(String.valueOf(troopProducer.getResourceCost(Resource.TIME)), skin);
			turnsCostLabel.setFontScale(FONTSCALE);
			turnsCostLabel.setAlignment(Align.center);
			turnsCostLabel.setVisible(visable);
			trainingTable.add(turnsCostLabel).size(WIDTH, HEIGHT).space(SPACE);
			//unit attributes
			//strenght
			Label trainingCostLabel = new Label("?", skin);
			trainingCostLabel.setFontScale(FONTSCALE);
			trainingCostLabel.setAlignment(Align.center);
			trainingCostLabel.setVisible(visable);
			trainingTable.add(trainingCostLabel).size(WIDTH, HEIGHT).space(SPACE);
			//accuracy
			Label accuracyCostLabel = new Label("?", skin);
			accuracyCostLabel.setFontScale(FONTSCALE);
			accuracyCostLabel.setAlignment(Align.center);
			accuracyCostLabel.setVisible(visable);
			trainingTable.add(accuracyCostLabel).size(WIDTH, HEIGHT).space(SPACE);
			//defance
			Label defanceCostLabel = new Label("?", skin);
			defanceCostLabel.setFontScale(FONTSCALE);
			defanceCostLabel.setAlignment(Align.center);
			defanceCostLabel.setVisible(visable);
			trainingTable.add(defanceCostLabel).size(WIDTH, HEIGHT).space(SPACE);
			//stamina
			Label staminaCostLabel = new Label("?", skin);
			staminaCostLabel.setFontScale(FONTSCALE);
			staminaCostLabel.setAlignment(Align.center);
			staminaCostLabel.setVisible(visable);
			trainingTable.add(staminaCostLabel).size(WIDTH, HEIGHT).space(SPACE);
			//speed
			Label speedCostLabel = new Label("?", skin);
			speedCostLabel.setFontScale(FONTSCALE);
			speedCostLabel.setAlignment(Align.center);
			speedCostLabel.setVisible(visable);
			trainingTable.add(speedCostLabel).size(WIDTH, HEIGHT).space(SPACE);
			//range
			Label rangeCostLabel = new Label("?", skin);
			rangeCostLabel.setFontScale(FONTSCALE);
			rangeCostLabel.setAlignment(Align.center);
			rangeCostLabel.setVisible(visable);
			trainingTable.add(rangeCostLabel).size(WIDTH, HEIGHT).space(SPACE);
		}
	}
	
	private void clearTabContainer() {
		getTabContainer().clear();
	}
	
	private Group getTabContainer() {
		return (Group)stage.getRoot().findActor("tab.container");
	}
	
	private void setTabBackground(Drawable drawable) {
		Table tabPane = (Table)stage.getRoot().findActor("tab.pane");
		tabPane.setBackground(drawable);
	}
	
	private void showMovementsTab() {
		final int COLUMN_MAX = 4;
		clearTabContainer();
		setTabBackground(assetHelper.getDrawable("image/council.pack:ui-tab-movement"));
		Table troopsTable = new Table();
		troopsTable.setPosition(15, 315);
		troopsTable.left().top();
		getTabContainer().addActor(troopsTable);
		
		int column = 0;
		for(Troop troop : selectedArea.getTroops()) {
			column++;
			ImageButton button = new ImageButton( createMovementImageButtonStyle(troop.getUnitName()) );
			troopsTable.add(button).width(42).center();
			if(column == COLUMN_MAX) {
				troopsTable.row();
				column = 0;
			}
		}
	}
	
	private static enum BuildingType {
		BRIDGE, TOWER, CASTLE
	}
	
	private Building selectedBuilding = null;
	public static final int CONSTRUCTIONMODE_REPAIR = 1, CONSTRUCTIONMODE_UPGRADE = 2, CONSTRUCTIONMODE_BUILD = 3;
	private int constructionMode = CONSTRUCTIONMODE_REPAIR;
	private BuildingType selectedBuildingType = BuildingType.BRIDGE;
	private boolean selectedBuildingTypeWithMoat = false;
	private int selectedBuildingLevel = 0;
	
	private void setConstructionMode(int constructionMode) {
		if( constructionMode == CONSTRUCTIONMODE_REPAIR || constructionMode == CONSTRUCTIONMODE_UPGRADE || constructionMode == CONSTRUCTIONMODE_BUILD ) {
			this.constructionMode = constructionMode;
			showConstructionsTab();
		}
	}
	
	private void setSelectedBuildingType(BuildingType selectedBuildingType) {
		this.selectedBuildingType = selectedBuildingType;
		showConstructionsTab();
	}
	
	private void showConstructionsTab() {
		clearTabContainer();
		setTabBackground(assetHelper.getDrawable("image/council.pack:ui-tab-construction"));
		final Group tabContainer = getTabContainer();
		
		//minimap
		Image minimap = new Image( assetHelper.getDrawable(selectedArea.getMinimapImage()) );
		minimap.setPosition(60, 190);
		tabContainer.addActor(minimap);
		
		//repair, upgrade and build-buttons
		ImageButton repairButton, upgradeButton, buildButton;
		ImageButton.ImageButtonStyle imageButtonStyle;
		
		//repairButton
		imageButtonStyle = new ImageButton.ImageButtonStyle();
		imageButtonStyle.up = assetHelper.getDrawable("image/council.pack:ui-button-repair");
		imageButtonStyle.down = assetHelper.getDrawable("image/council.pack:ui-button-repair-click");
		imageButtonStyle.imageDisabled = assetHelper.getDrawable("image/council.pack:ui-button-overlay-wait-full");
		imageButtonStyle.disabled = AssetHelper.EMPTY;
		repairButton = new ImageButton(imageButtonStyle);
		repairButton.setPosition(6, 250);
		repairButton.addListener(new ClickListener() {
			@Override
			public void clicked(InputEvent event, float x, float y) {
				setConstructionMode(CONSTRUCTIONMODE_REPAIR);
			}
		});
		tabContainer.addActor(repairButton);
		
		//upgradeButton
		imageButtonStyle = new ImageButton.ImageButtonStyle();
		imageButtonStyle.up = assetHelper.getDrawable("image/council.pack:ui-button-upgrade");
		imageButtonStyle.down = assetHelper.getDrawable("image/council.pack:ui-button-upgrade-click");
		imageButtonStyle.imageDisabled = assetHelper.getDrawable("image/council.pack:ui-button-overlay-wait-full");
		imageButtonStyle.disabled = AssetHelper.EMPTY;
		upgradeButton = new ImageButton(imageButtonStyle);
		upgradeButton.setPosition(6, 218);
		upgradeButton.addListener(new ClickListener() {
			@Override
			public void clicked(InputEvent event, float x, float y) {
				setConstructionMode(CONSTRUCTIONMODE_UPGRADE);
			}
		});
		tabContainer.addActor(upgradeButton);
		
		//buildButton
		imageButtonStyle = new ImageButton.ImageButtonStyle();
		imageButtonStyle.up = assetHelper.getDrawable("image/council.pack:ui-button-build");
		imageButtonStyle.down = assetHelper.getDrawable("image/council.pack:ui-button-build-click");
		imageButtonStyle.imageDisabled = assetHelper.getDrawable("image/council.pack:ui-button-overlay-wait-full");
		imageButtonStyle.disabled = AssetHelper.EMPTY;
		buildButton = new ImageButton(imageButtonStyle);
		buildButton.setPosition(6, 186);
		buildButton.addListener(new ClickListener() {
			@Override
			public void clicked(InputEvent event, float x, float y) {
				setConstructionMode(CONSTRUCTIONMODE_BUILD);
			}
		});
		tabContainer.addActor(buildButton);
		
		//building-buttons
		ImageButton bridgeButton, towerButton, castleButton, castle2Button;
		
		//bridge-button
		imageButtonStyle = new ImageButton.ImageButtonStyle();
		imageButtonStyle.up = assetHelper.getDrawable("image/council.pack:ui-button-bridge");
		imageButtonStyle.down = assetHelper.getDrawable("image/council.pack:ui-button-bridge-click");
		imageButtonStyle.imageDisabled = assetHelper.getDrawable("image/council.pack:ui-button-overlay-wait-full");
		imageButtonStyle.disabled = AssetHelper.EMPTY;
		bridgeButton = new ImageButton(imageButtonStyle);
		bridgeButton.setPosition(10, 145);
		bridgeButton.addListener(new ClickListener() {
			@Override
			public void clicked(InputEvent event, float x, float y) {
				setSelectedBuildingType(BuildingType.BRIDGE);
			}
		});
		tabContainer.addActor(bridgeButton);
		
		//tower-button
		imageButtonStyle = new ImageButton.ImageButtonStyle();
		imageButtonStyle.up = assetHelper.getDrawable("image/council.pack:ui-button-tower");
		imageButtonStyle.down = assetHelper.getDrawable("image/council.pack:ui-button-tower-click");
		imageButtonStyle.imageDisabled = assetHelper.getDrawable("image/council.pack:ui-button-overlay-wait-full");
		imageButtonStyle.disabled = AssetHelper.EMPTY;
		towerButton = new ImageButton(imageButtonStyle);
		towerButton.setPosition(55, 145);
		towerButton.addListener(new ClickListener() {
			@Override
			public void clicked(InputEvent event, float x, float y) {
				setSelectedBuildingType(BuildingType.TOWER);
			}
		});
		tabContainer.addActor(towerButton);
		
		//castle-button
		imageButtonStyle = new ImageButton.ImageButtonStyle();
		imageButtonStyle.up = assetHelper.getDrawable("image/council.pack:ui-button-castle");
		imageButtonStyle.down = assetHelper.getDrawable("image/council.pack:ui-button-castle-click");
		imageButtonStyle.imageDisabled = assetHelper.getDrawable("image/council.pack:ui-button-overlay-wait-full");
		imageButtonStyle.disabled = AssetHelper.EMPTY;
		castleButton = new ImageButton(imageButtonStyle);
		castleButton.setPosition(100, 145);
		castleButton.addListener(new ClickListener() {
			@Override
			public void clicked(InputEvent event, float x, float y) {
				setSelectedBuildingType(BuildingType.CASTLE);
			}
		});
		tabContainer.addActor(castleButton);
		
		//castle2-button
		imageButtonStyle = new ImageButton.ImageButtonStyle();
		imageButtonStyle.up = assetHelper.getDrawable("image/council.pack:ui-button-castle2");
		imageButtonStyle.down = assetHelper.getDrawable("image/council.pack:ui-button-castle2-click");
		imageButtonStyle.imageDisabled = assetHelper.getDrawable("image/council.pack:ui-button-overlay-wait-full");
		imageButtonStyle.disabled = AssetHelper.EMPTY;
		castle2Button = new ImageButton(imageButtonStyle);
		castle2Button.setPosition(145, 145);
		castle2Button.addListener(new ClickListener() {
			@Override
			public void clicked(InputEvent event, float x, float y) {
				selectedBuildingTypeWithMoat = true;
				setSelectedBuildingType(BuildingType.CASTLE);
			}
		});
		tabContainer.addActor(castle2Button);
		
		//number-buttons
		ImageButton number1Button, number2Button, number3Button, number4Button, number5Button, number6Button;
		
		//number 1 button
		imageButtonStyle = new ImageButton.ImageButtonStyle();
		imageButtonStyle.up = assetHelper.getDrawable("image/council.pack:ui-button-1");
		imageButtonStyle.down = assetHelper.getDrawable("image/council.pack:ui-button-1-click");
		imageButtonStyle.disabled = AssetHelper.EMPTY;
		number1Button = new ImageButton(imageButtonStyle);
		number1Button.setPosition(16, 119);
		number1Button.addListener(new ClickListener() {
			@Override
			public void clicked(InputEvent event, float x, float y) {
								
			}
		});
		tabContainer.addActor(number1Button);
		//number 2 button
		imageButtonStyle = new ImageButton.ImageButtonStyle();
		imageButtonStyle.up = assetHelper.getDrawable("image/council.pack:ui-button-2");
		imageButtonStyle.down = assetHelper.getDrawable("image/council.pack:ui-button-2-click");
		imageButtonStyle.disabled = AssetHelper.EMPTY;
		number2Button = new ImageButton(imageButtonStyle);
		number2Button.setPosition(16, 95);
		number2Button.addListener(new ClickListener() {
			@Override
			public void clicked(InputEvent event, float x, float y) {
								
			}
		});
		tabContainer.addActor(number2Button);
		//number 3 button
		imageButtonStyle = new ImageButton.ImageButtonStyle();
		imageButtonStyle.up = assetHelper.getDrawable("image/council.pack:ui-button-3");
		imageButtonStyle.down = assetHelper.getDrawable("image/council.pack:ui-button-3-click");
		imageButtonStyle.disabled = AssetHelper.EMPTY;
		number3Button = new ImageButton(imageButtonStyle);
		number3Button.setPosition(16, 70);
		number3Button.addListener(new ClickListener() {
			@Override
			public void clicked(InputEvent event, float x, float y) {
								
			}
		});
		tabContainer.addActor(number3Button);
		//number 4 button
		imageButtonStyle = new ImageButton.ImageButtonStyle();
		imageButtonStyle.up = assetHelper.getDrawable("image/council.pack:ui-button-4");
		imageButtonStyle.down = assetHelper.getDrawable("image/council.pack:ui-button-4-click");
		imageButtonStyle.disabled = AssetHelper.EMPTY;
		number4Button = new ImageButton(imageButtonStyle);
		number4Button.setPosition(54, 119);
		number4Button.addListener(new ClickListener() {
			@Override
			public void clicked(InputEvent event, float x, float y) {
							
			}
		});
		tabContainer.addActor(number4Button);
		//number 5 button
		imageButtonStyle = new ImageButton.ImageButtonStyle();
		imageButtonStyle.up = assetHelper.getDrawable("image/council.pack:ui-button-5");
		imageButtonStyle.down = assetHelper.getDrawable("image/council.pack:ui-button-5-click");
		imageButtonStyle.disabled = AssetHelper.EMPTY;
		number5Button = new ImageButton(imageButtonStyle);
		number5Button.setPosition(54, 95);
		number5Button.addListener(new ClickListener() {
			@Override
			public void clicked(InputEvent event, float x, float y) {
								
			}
		});
		tabContainer.addActor(number5Button);
		//number 6 button
		imageButtonStyle = new ImageButton.ImageButtonStyle();
		imageButtonStyle.up = assetHelper.getDrawable("image/council.pack:ui-button-6");
		imageButtonStyle.down = assetHelper.getDrawable("image/council.pack:ui-button-6-click");
		imageButtonStyle.disabled = AssetHelper.EMPTY;
		number6Button = new ImageButton(imageButtonStyle);
		number6Button.setPosition(54, 70);
		number6Button.addListener(new ClickListener() {
			@Override
			public void clicked(InputEvent event, float x, float y) {
								
			}
		});
		tabContainer.addActor(number6Button);
		
		//building-preview-image
		Image buildingPreview = new Image(assetHelper.getDrawable("image/council.pack:tower-preview"));
		buildingPreview.setPosition(110, 65);
		tabContainer.addActor(buildingPreview);
	}
	
	private void showInformationTab() {
		clearTabContainer();
		setTabBackground(assetHelper.getDrawable("image/council.pack:ui-tab-information"));
	}
	
	private void showAdministrationTab() {
		clearTabContainer();
		setTabBackground(assetHelper.getDrawable("image/council.pack:ui-tab-administration"));
		final Group tabContainer = getTabContainer();
		final Team team = selectedArea.getTeam();
		
		ImageButton.ImageButtonStyle upgradeButtonStyle = new ImageButton.ImageButtonStyle();
		upgradeButtonStyle.up = assetHelper.getDrawable("image/council.pack:ui-button-upgrade2");
		upgradeButtonStyle.down = assetHelper.getDrawable("image/council.pack:ui-button-upgrade2-click");
		upgradeButtonStyle.disabled = AssetHelper.EMPTY;
		upgradeButtonStyle.imageDisabled = assetHelper.getDrawable("image/council.pack:ui-button-overlay-wait-full");
		
		//armament
		final ArmamentUpgrader armamentUpgrader = team.getArmamentUpgrader();	
		Image armamentImage = new Image( assetHelper.getDrawable( armamentUpgrader.getImage() ) );
		armamentImage.setPosition(5, 195);
		tabContainer.addActor(armamentImage);
		ImageButton armamentUpgradeButton = new ImageButton(upgradeButtonStyle);
		if(armamentUpgrader.isStarted()) {
			armamentUpgradeButton.setDisabled(true);
		}else if(!armamentUpgrader.canPayNextUpgrade()) {
			armamentUpgradeButton.setVisible(false);//disabled
		}
		armamentUpgradeButton.addListener(new ClickListener() {
			@Override
			public void clicked(InputEvent event, float x, float y) {
				armamentUpgrader.startNextUpgrade();
				assetHelper.getSound("upgrading armerment").play();
				updateUI();
			}
		});
		armamentUpgradeButton.setPosition(120, 195);
		tabContainer.addActor(armamentUpgradeButton);
		Label armamentUpgradeGoldCostLabel = new Label(Integer.toString(armamentUpgrader.getNextUpgradeCosts(Resource.GOLD)), skin);
		armamentUpgradeGoldCostLabel.setFontScale(0.75f);
		armamentUpgradeGoldCostLabel.setAlignment(Align.center);
		armamentUpgradeGoldCostLabel.setPosition(130, 240);
		tabContainer.addActor(armamentUpgradeGoldCostLabel);
		Label armamentUpgradeTurnCostLabel = new Label(Integer.toString(armamentUpgrader.getNextUpgradeCosts(Resource.TIME)), skin);
		armamentUpgradeTurnCostLabel.setFontScale(0.75f);
		armamentUpgradeTurnCostLabel.setAlignment(Align.center);
		armamentUpgradeTurnCostLabel.setPosition(160, 240);
		tabContainer.addActor(armamentUpgradeTurnCostLabel);
		Label armamentLevelLabel = new Label(armamentUpgrader.getLevel() + LEVEL_DIVIDER + armamentUpgrader.getMaxLevel(), skin);
		armamentLevelLabel.setFontScale(0.8f);
		armamentLevelLabel.setPosition(90, 307);
		tabContainer.addActor(armamentLevelLabel);
		
		//architecture
		final ArchitectureUpgrader architectureUpgrader = team.getArchitectureUpgrader();
		Image architectureImage = new Image( assetHelper.getDrawable( architectureUpgrader.getImage() ) );
		architectureImage.setPosition(5, 60);
		tabContainer.addActor(architectureImage);
		ImageButton architectureUpgradeButton = new ImageButton(upgradeButtonStyle);
		if(architectureUpgrader.isStarted()) {
			architectureUpgradeButton.setDisabled(true);
		}else if(!architectureUpgrader.canPayNextUpgrade()) {
			architectureUpgradeButton.setVisible(false);//disabled
		}
		architectureUpgradeButton.addListener(new ClickListener() {
			@Override
			public void clicked(InputEvent event, float x, float y) {
				architectureUpgrader.startNextUpgrade();
				assetHelper.getSound("upgrading architecture").play();
				updateUI();
			}
		});
		architectureUpgradeButton.setPosition(120, 65);
		tabContainer.addActor(architectureUpgradeButton);
		Label architectureUpgradeGoldCostLabel = new Label( Integer.toString( architectureUpgrader.getNextUpgradeCosts(Resource.GOLD) ) , skin);
		architectureUpgradeGoldCostLabel.setFontScale(0.75f);
		architectureUpgradeGoldCostLabel.setAlignment(Align.center);
		architectureUpgradeGoldCostLabel.setPosition(130, 105);
		tabContainer.addActor(architectureUpgradeGoldCostLabel);
		Label architectureUpgradeTurnCostLabel = new Label( Integer.toString( architectureUpgrader.getNextUpgradeCosts(Resource.TIME) ), skin);
		architectureUpgradeTurnCostLabel.setFontScale(0.75f);
		architectureUpgradeTurnCostLabel.setAlignment(Align.center);
		architectureUpgradeTurnCostLabel.setPosition(160, 105);
		tabContainer.addActor(architectureUpgradeTurnCostLabel);
		Label architectureLevelLabel = new Label( architectureUpgrader.getLevel() + LEVEL_DIVIDER + architectureUpgrader.getMaxLevel(), skin);
		architectureLevelLabel.setFontScale(0.8f);
		architectureLevelLabel.setPosition(90, 175);
		tabContainer.addActor(architectureLevelLabel);
	}
	
	private Actor createResources() {
		//constants
		final float LABEL_WIDTH = 36;
		final float LABEL_FONT = .8f;
		
		Group group = new Group();
		
		Image background = new Image( assetHelper.getDrawable("image/council.pack:ui-panel-stats") );
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
		String stylePrefixName = "image/council.pack:ui-button-";
		
		ImageButton.ImageButtonStyle style = new ImageButton.ImageButtonStyle();
		style.up = assetHelper.getDrawable(stylePrefixName + name);
		style.down = assetHelper.getDrawable(stylePrefixName + name + "-click");
		style.disabled = assetHelper.getDrawable(stylePrefixName + name + "-disabled");	
		
		return style;
	}
	
	private ImageButton.ImageButtonStyle createMovementImageButtonStyle(String name){
		String stylePrefixName = "image/council.pack:ui-checkbox-";
		
		ImageButton.ImageButtonStyle style = new ImageButton.ImageButtonStyle();
		style.up = assetHelper.getDrawable(stylePrefixName + name);
		style.checked = assetHelper.getDrawable(stylePrefixName + name + "-selected");
		style.disabled = assetHelper.getDrawable(stylePrefixName + name + "-disabled");		
		
		return style;
	}
	
	private ImageButton.ImageButtonStyle createStyle(Area area){
		boolean enemy = true;
		if(area.getTeam().equals(player.getTeam())) {//if area has other team
			enemy = false;
		}
		final String buttonUpStyle = "image/council.pack:area-" + area.getName().toLowerCase() + (enemy ? "-enemy" : "");
		final String buttonCheckedStyle = buttonUpStyle + "-select";
		
		//style
		ImageButton.ImageButtonStyle style = new ImageButton.ImageButtonStyle();
		style.up = new TextureRegionDrawable(assetHelper.getAtlasRegion(buttonUpStyle));
		style.checked = new TextureRegionDrawable(assetHelper.getAtlasRegion(buttonCheckedStyle));
		return style;		
	}
	
	private void save() {
		
	}
	
	private void load(String name) {
		
	}
	
	public void loadDefaults() {
		
	}
	
	@Override
	public void dispose() {
		super.dispose();
		assetManager.dispose();
		for(Disposable disposable : disposables) {
			disposable.dispose();
		}		
	}
	
	private static final class UI {	
		Areas areas = new Areas();
		Resources resources = new Resources();
		
		Label currentYear;
		Label currentWeek;
		Label location;
		Label info;
		
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
	}
}
