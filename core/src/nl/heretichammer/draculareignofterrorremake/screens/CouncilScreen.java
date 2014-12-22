package nl.heretichammer.draculareignofterrorremake.screens;

import java.beans.PropertyChangeEvent;

import nl.heretichammer.draculareignofterrorremake.Player;
import nl.heretichammer.draculareignofterrorremake.annotations.Asset;
import nl.heretichammer.draculareignofterrorremake.annotations.View;
import nl.heretichammer.draculareignofterrorremake.models.Area;
import nl.heretichammer.draculareignofterrorremake.models.Troop;
import nl.heretichammer.draculareignofterrorremake.models.World;
import nl.heretichammer.draculareignofterrorremake.models.buildings.Building;
import nl.heretichammer.draculareignofterrorremake.models.producer.TroopProducer;
import nl.heretichammer.draculareignofterrorremake.models.team.Team;
import nl.heretichammer.draculareignofterrorremake.utils.ActorLoader;

import com.badlogic.gdx.assets.AssetManager;
import com.badlogic.gdx.audio.Music;
import com.badlogic.gdx.audio.Sound;
import com.badlogic.gdx.graphics.g2d.TextureAtlas;
import com.badlogic.gdx.scenes.scene2d.Actor;
import com.badlogic.gdx.scenes.scene2d.Group;
import com.badlogic.gdx.scenes.scene2d.InputEvent;
import com.badlogic.gdx.scenes.scene2d.ui.Image;
import com.badlogic.gdx.scenes.scene2d.ui.ImageButton;
import com.badlogic.gdx.scenes.scene2d.ui.Label;
import com.badlogic.gdx.scenes.scene2d.ui.Table;
import com.badlogic.gdx.scenes.scene2d.utils.Align;
import com.badlogic.gdx.scenes.scene2d.utils.Drawable;
import com.badlogic.gdx.scenes.scene2d.utils.TextureRegionDrawable;
import com.google.common.eventbus.Subscribe;

public class CouncilScreen extends ActorScreen {	
	@Asset("image/council.pack") private TextureAtlas images;
	@Asset("music/council1.mp3") private Music music;
	
	//sounds
	@Asset("sound/click.ogg") private Sound sound_click;
	//upgrading
	@Asset("sound/upgrading armerment.ogg") private Sound sound_upgradingArmerment;
	@Asset("sound/upgrading architecture.ogg") private Sound sound_upgradingArchitecture;
	@Asset("sound/training swordsoldiers.ogg") private Sound sound_trainingSwordsoldiers;
	@Asset("sound/training crossbowsoldiers.ogg") private Sound sound_trainingCrossbowsoldiers;
	@Asset("sound/building juggernaut.ogg") private Sound sound_trainingJuggernaut;
	@Asset("sound/training a knight.ogg") private Sound sound_trainingKnight;
	@Asset("sound/building a catapult.ogg") private Sound sound_trainingCatapult;
	@Asset("sound/building a cannon.ogg") private Sound sound_trainingCannon;
	@Asset("sound/training spies.ogg") private Sound sound_trainingSpies;
	//construction
	//repair
	@Asset("sound/repairing bridge.ogg") private Sound sound_repairingBridge;
	@Asset("sound/repairing tower.ogg") private Sound sound_repairingTower;
	@Asset("sound/repairing stronghold.ogg") private Sound sound_repairingStronghold;
	@Asset("sound/repairing fortification.ogg") private Sound sound_repairingFortification;
	@Asset("sound/repairing cancelled.ogg") private Sound sound_repairingCancelled;
	//upgrade
	@Asset("sound/upgrading stronghold.ogg") private Sound sound_upgradingStronghold;
	@Asset("sound/upgrading fortification.ogg") private Sound sound_upgradingFortification;
	@Asset("sound/upgrading cancelled.ogg") private Sound sound_upgradingCancelled;
	//build
	@Asset("sound/building bridge.ogg") private Sound sound_buildingBridge;
	@Asset("sound/building tower.ogg") private Sound sound_buildingTower;
	@Asset("sound/building stronghold.ogg") private Sound sound_buildingStronghold;
	@Asset("sound/building fortification.ogg") private Sound sound_buildingFortification;
	@Asset("sound/building cancelled.ogg") private Sound sound_buildingCancelled;
	@Asset("sound/building completed.ogg") private Sound sound_buildingCompleted;
	
	//views auto-bind to the given name in the stage
	@View("week") private Label view_week;
	@View("year") private Label view_year;
	//trainers
	@View("trainer.swordsoldiers") private ImageButton view_trainerSwordsoldiers;
	@View("trainer.crossbowsoldiers") private ImageButton view_trainerCrossbowsoldiers;
	@View("trainer.knight") private ImageButton view_trainerKnight;
	@View("trainer.juggernaut") private ImageButton view_trainerJuggernaut;
	@View("trainer.catapult") private ImageButton view_trainerCatapult;
	@View("trainer.cannon") private ImageButton view_trainerCannon;
	@View("trainer.spy") private ImageButton view_trainerSpy;
	
	
	private Player player;
	private World world;
	private Area selectedArea;
	
	public CouncilScreen() {
		world = new World();
		player = new Player(Team.transylvanians);
		//new AIPlayer(world.findTeamByName("turks"));//will add itself to turks team
	}
	
	@Override
	protected void load(AssetManager assetManager) {
		super.load(assetManager);
		assetManager.load("layout/CouncilScreen.xml", Actor.class, new ActorLoader.ActorLoaderParameter(this));
	}
	
	protected void loaded(AssetManager assetManager) {
		stage.addActor( assetManager.get("layout/CouncilScreen.xml", Actor.class) );
		super.loaded(assetManager);
	};
	
	@Override
	public void show() {
		super.show();
		
		setSelectedArea(world.getArea("fagaras"));
		//music.play();
		
		view_week.setText( String.valueOf(world.getWeek()) );
		view_year.setText( String.valueOf(world.getYear()) );
		world.register(new Object(){
			@Subscribe
			public void on(PropertyChangeEvent e){
				String name = e.getPropertyName();
				if(name.equals("week")){
					view_week.setText( e.getNewValue().toString() );
				}else if(name.equals("year")){
					view_year.setText( e.getNewValue().toString() );
				}
			}
		});
	}
	
	public void setSelectedArea(Area selectedArea) {
		this.selectedArea = selectedArea;
		//update view
		ImageButton[] views = new ImageButton[]{ view_trainerSwordsoldiers, view_trainerCrossbowsoldiers, view_trainerKnight, view_trainerJuggernaut, view_trainerCatapult, view_trainerCatapult, view_trainerSpy};
		for(ImageButton view : views){
			TroopProducer<?> troopProducer = selectedArea.getTroopProducer(view.getUserObject().toString());
			//troopProducer.
		}
	}
	
	public void selectArea(InputEvent event){
		String name = event.getTarget().getUserObject().toString();
		Area area = world.getArea(name);
		setSelectedArea(area);
	}
	
	public void week(InputEvent event){
		sound_click.play();
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
		background.setDrawable(getDrawable("ui-tab-training"));
		root.findActor("tab.training").setVisible(true);
	}
	
	public void showMovementTab(InputEvent event){
		hideAllTabs();
		Group root = stage.getRoot();
		Image background = (Image) root.findActor("tab.background");
		background.setDrawable(getDrawable("ui-tab-movement"));
		
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
		background.setDrawable(getDrawable("ui-tab-construction"));
		root.findActor("tab.constructions").setVisible(true);
	}
	
	public void showInformationTab(InputEvent event){
		hideAllTabs();
		Group root = stage.getRoot();
		Image background = (Image) root.findActor("tab.background");
		background.setDrawable(getDrawable("ui-tab-information"));
		root.findActor("tab.information").setVisible(true);
	}
	
	public void showAdministrationTab(InputEvent event){
		hideAllTabs();
		Group root = stage.getRoot();
		Image background = (Image) root.findActor("tab.background");
		background.setDrawable(getDrawable("ui-tab-administration"));
		root.findActor("tab.administration").setVisible(true);
	}
	
	public void trainTroop(InputEvent event){
		String name = event.getTarget().getUserObject().toString();
		
		if(name.equals("swordsoldier")){
			sound_trainingSwordsoldiers.play();
		}else if(name.equals("crossbowsoldier")){
			sound_trainingCrossbowsoldiers.play();
		}else if(name.equals("knight")){
			sound_trainingKnight.play();
		}else if(name.equals("juggernaut")){
			sound_trainingJuggernaut.play();
		}else if(name.equals("catapult")){
			sound_trainingCatapult.play();
		}else if(name.equals("cannon")){
			sound_trainingCannon.play();
		}else if(name.equals("spy")){
			sound_trainingSpies.play();
		}
		
		TroopProducer<?> troopProducer = selectedArea.getTroopProducer(name);
		troopProducer.start();
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
		sound_upgradingArmerment.play();
	}
	
	public void upgradeArchitecture(InputEvent event){
		//player.getTeam().getArchitectureUpgrader().startNextUpgrade();
		sound_upgradingArchitecture.play();
	}
	
	private ImageButton.ImageButtonStyle createMovementImageButtonStyle(String name){		
		ImageButton.ImageButtonStyle style = new ImageButton.ImageButtonStyle();
		style.up = getDrawable("ui-checkbox-" + name);
		style.checked = getDrawable("ui-checkbox-" + name + "-selected");
		style.disabled = getDrawable("ui-checkbox-" + name + "-disabled");		
		
		return style;
	}
	
	@Override
	public void dispose() {
		super.dispose();
		//TODO: check if al loaded assets in this class will be disposed automaticly?
	}
	
	private Drawable getDrawable(String name){
		return new TextureRegionDrawable(images.findRegion(name));
	}
}
