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
	
	private Player player;
	private World world;
	private Area selectedArea;
	
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
	}
	
	public void weekClicked(InputEvent event){
		world.week();
	}
	
	private void hideAllTabs(){
		Group root = stage.getRoot();
		//hide all
		root.findActor("tab.training").setVisible(false);
		root.findActor("tab.movement").setVisible(false);
		root.findActor("tab.constructions").setVisible(false);
		root.findActor("tab.information").setVisible(false);
		root.findActor("tab.administration").setVisible(false);
	}
	
	public void showTrainingTab(InputEvent event){
		hideAllTabs();
		Group root = stage.getRoot();
		Image background = (Image) root.findActor("tab.background");
		background.setDrawable(assetHelper.getDrawable("image/council.pack:ui-tab-training"));
		root.findActor("tab.training").setVisible(true);
	}
	
	public void showMovementTab(InputEvent event){
		hideAllTabs();
		Group root = stage.getRoot();
		Image background = (Image) root.findActor("tab.background");
		background.setDrawable(assetHelper.getDrawable("image/council.pack:ui-tab-movement"));
		
		Table table = root.findActor("movement.troops");
		table.clear();
		table.row().align(Align.topLeft);
		int column = 0;
		for(Troop troop : selectedArea.getTroops()) {
			column++;
			ImageButton button = new ImageButton( createMovementImageButtonStyle(troop.getUnitName()) );
			table.add(button).width(42).center();
			if(column == 4) {
				table.row().align(Align.topLeft);
				column = 0;
			}
		}
		
		root.findActor("tab.movement").setVisible(true);
	}
	
	public void showConstructionsTab(InputEvent event){
		hideAllTabs();
		Group root = stage.getRoot();
		Image background = (Image) root.findActor("tab.background");
		background.setDrawable(assetHelper.getDrawable("image/council.pack:ui-tab-construction"));
		root.findActor("tab.constructions").setVisible(true);
	}
	
	public void showInformationTab(InputEvent event){
		hideAllTabs();
		Group root = stage.getRoot();
		Image background = (Image) root.findActor("tab.background");
		background.setDrawable(assetHelper.getDrawable("image/council.pack:ui-tab-information"));
		root.findActor("tab.information").setVisible(true);
	}
	
	public void showAdministrationTab(InputEvent event){
		hideAllTabs();
		Group root = stage.getRoot();
		Image background = (Image) root.findActor("tab.background");
		background.setDrawable(assetHelper.getDrawable("image/council.pack:ui-tab-administration"));
		root.findActor("tab.administration").setVisible(true);
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
	
	public void upgradeArmament(InputEvent event){
		//player.getTeam().getArmamentUpgrader().startNextUpgrade();
		assetHelper.getSound("upgrading armerment").play();
	}
	
	public void upgradeArchitecture(InputEvent event){
		//player.getTeam().getArchitectureUpgrader().startNextUpgrade();
		assetHelper.getSound("upgrading architecture").play();
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
}
