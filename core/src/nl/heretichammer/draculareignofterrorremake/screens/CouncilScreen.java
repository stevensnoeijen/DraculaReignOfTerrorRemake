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
		assetManager.load("sound/click.ogg", Sound.class);
		assetManager.load("music/council2.mp3", Music.class);
		assetManager.load("sound/upgrading armerment.ogg", Sound.class);
		assetManager.load("sound/upgrading architecture.ogg", Sound.class);
		assetManager.load("layout/CouncilScreen.xml", Actor.class, new ActorLoader.ActorLoaderParameter(this));
		assetManager.finishLoading();
		
		//skin = assetManager.get("skin/uiskin.json", Skin.class); 
		stage.addActor( assetManager.get("layout/CouncilScreen.xml", Actor.class) );//background
		
		/*
		Actor tab = createTabPane();
		tab.setPosition(25, 50);		
		stage.addActor(tab);
		showTrainingTab();
		*/
		
		//updateUI();
		
		((Image)stage.getRoot().findActor("tab.background")).setDrawable(assetHelper.getDrawable("image/council.pack:ui-tab-training"));
	}
	
	public void weekClicked(InputEvent event){
		world.week();
	}
	
	public void tabClicked(InputEvent event){
		String name = event.getTarget().getName();
		
		Group root = stage.getRoot();
		//hide all
		root.findActor("training.content").setVisible(false);
		root.findActor("movement.content").setVisible(false);
		root.findActor("constructions.content").setVisible(false);
		root.findActor("information.content").setVisible(false);
		root.findActor("administration.content").setVisible(false);
		//change background
		Image background = (Image) root.findActor("tab.background");
		if(name.equals("training")){
			background.setDrawable(assetHelper.getDrawable("image/council.pack:ui-tab-training"));
		}else if(name.equals("movement")){
			background.setDrawable(assetHelper.getDrawable("image/council.pack:ui-tab-movement"));
		}else if(name.equals("constructions")){
			background.setDrawable(assetHelper.getDrawable("image/council.pack:ui-tab-construction"));
		}else if(name.equals("information")){
			background.setDrawable(assetHelper.getDrawable("image/council.pack:ui-tab-information"));
		}else if(name.equals("administration")){
			background.setDrawable(assetHelper.getDrawable("image/council.pack:ui-tab-administration"));
		}
		//show clicked tab
		root.findActor(name + ".content").setVisible(true);
		
		//stage.getRoot().findActor(name + ".content").setVisible(true);
	}
	
	public void trainUnitClicked(InputEvent event){
		String name = event.getTarget().getName();
		String troopName = name.split(".")[1];
		for(TroopProducer<?> troopProducer : selectedArea.getTroopProducers()){
			if(troopProducer.getTroopName().equals(troopName)){
				troopProducer.start();
			}
		}
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
		}
	}
	
	private void setSelectedBuildingType(BuildingType selectedBuildingType) {
		this.selectedBuildingType = selectedBuildingType;
	}
	
	public void repair(InputEvent event){
		setConstructionMode(CONSTRUCTIONMODE_REPAIR);
	}
	
	public void upgrade(InputEvent event){
		setConstructionMode(CONSTRUCTIONMODE_UPGRADE);
	}
	
	public void build(InputEvent event){
		setConstructionMode(CONSTRUCTIONMODE_BUILD);
	}
	
	public void buildingTypeBridge(InputEvent event){
		setSelectedBuildingType(BuildingType.BRIDGE);
	}
	
	public void buildingTypeTower(InputEvent event){
		setSelectedBuildingType(BuildingType.TOWER);
	}
	
	public void buildingTypeCastle(InputEvent event){
		setSelectedBuildingType(BuildingType.CASTLE);
	}
	
	public void buildingTypeCastle2(InputEvent event){
		selectedBuildingTypeWithMoat = true;
		setSelectedBuildingType(BuildingType.CASTLE);
	}
	
	public void number(InputEvent event){
		System.out.println(event.getListenerActor().getUserObject());
	}
	
	private void showInformationTab() {
		clearTabContainer();
		setTabBackground(assetHelper.getDrawable("image/council.pack:ui-tab-information"));
	}
	
	public void upgradeArmament(InputEvent event){
		//player.getTeam().getArmamentUpgrader().startNextUpgrade();
		assetHelper.getSound("upgrading armerment").play();
		updateUI();
	}
	
	public void upgradeArchitecture(InputEvent event){
		//player.getTeam().getArchitectureUpgrader().startNextUpgrade();
		assetHelper.getSound("upgrading architecture").play();
		updateUI();
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
