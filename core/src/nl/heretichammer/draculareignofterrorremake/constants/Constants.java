package nl.heretichammer.draculareignofterrorremake.constants;

public final class Constants {
	public final class Assets {
		public final class Data {
			public final class Troops {
				
			}
			public final class Units {
				
			}
		}
	}
	
	public static final class items {
		public static final class categories{
			public static final String resource = "resource";
		}
	}	
	public static final class troops {
		public static final int swordsmen = 5;
		public static final int crossbowsoldiers = 5;
		public static final int juggernaut = 1;
	}
	
	public static final class translations {
		public static final String click = "Click to toggle graph";
		public static final class worldmap {
			public static final String ad = "Anno Domini";
			public static final String week = "Week";
			public static final String confirm = "Confirm orders and advance to next turn";
			public static final String scoutReport = "Out spies report";
			public static final String notKnown = "This is not known, yet...";
			public static final String selects = "Selects %s";
			public static final class reports {
				public static final String underAttack = "We're under attack!\nThe turks have crossed  the border of %s. Now we must defend our ground until last man falls";
				public static final String scoutsReport = "Scouts reporting!\nOur spies in the county of %s has succeeded in sending us resource information!";
			}			
			public static final class resources {
				public static final String gold = "Available gold and the progress";
				public static final String wood = "Available wood and the progress";
				public static final String food = "Available food and the progress";
				public static final String men = "Available men and the progress";
				public static final String army = "Available army and the progress";
			} 			
			public static final class tabs {
				public static final String in = "In %s";
				public static final class training {
					public static final class units {
						public static final String swordsmen = "Train five swordsmen";
						public static final String crossbowsoldiers = "Train five crossbowsoldiers";
						public static final String juggernaut = "Build a juggernaut";
					}
					public static final class properties {
						public static final class cost {
							public static final String gold = "Cost in gold";
							public static final String time = "Time to produce";
						}
					}
				}
				public static final class movement {
					public static final String tip = "Select troops and click on a province to move or attack";
				}
				public static final class construction {
					public static final String repair = "Repair";
					public static final String repairTip = "Select repair mode";
					public static final String repairClickTip = "Click to repair";
					public static final String upgrade = "Upgrade";
					public static final String upgradeTip = "Select upgrade mode";
					public static final String upgradeClickTip = "Click to upgrade";
					public static final String build = "Build";
					public static final String buildTip = "Select build mode";
					public static final String buildClickTip = "Click to build";
					public static final String tip = "Use minimap to start building";
					public static final String minimapTip = "Shows a minimap of the province";
					public static final String differentArchitectures = "Select different architectures";
					public static final String buildBuilding = "Build %s";
				}
				public static final class information {
					public static final class resources {
						public static final String gold = "Gold resources produced per week in Province";
						public static final String wood = "Building material resources produced per week in Province";
						public static final String food = "Food resources produced per week in Province";
						public static final String men = "MEn resources produced per week in Province";
					}
					public static final String troops = "Shows all your troops in province";
					public static final String building = "Shows all buildings in province";
				}
				public static final class administration {
					public static final String armament = "Armament";
					public static final String architecture = "Architecture";
					public static final String upgrade = "Upgrade level of %s";
					public static final String inProgress = "In progress\nClick to cancel";
				}
			}
		}
		public static final class areamap {
			public static final String formation = "Formation walk";
		}	
		public static final class units {
			public static final class properties {
				public static final String attack = "Attack strength";
				public static final String accuracy = "Accuracy of aim";
				public static final String defence = "Defence strength";
				public static final String stamina = "Stamina";
				public static final String speed = "Speed";
				public static final String range = "Range";
			}
		}		
		public static final class items {
			public final static class resources {
				public static final String gold = "Gold";
				public static final String wood = "Wood";
				public static final String food = "food";
			}
		}
		public static final class buildings {
			public static final String bridge = "bridge";
			public static final String tower = "tower";
			public static final String castle = "castle";
		}
	}
	
	public static final class save {
		public static final class team {
			public static final class access {
				public static final class armament {
					public static final String bridge = "armament.x";
				}
				public static final class architecture {
					public static final String bridge = "architecture.x";
				}
			}
		}
	}
	
	public static final class exceptions{
		public static final String incorrectformat = "Incorrect format";
		public static final String paramNull = "Parameter %s can't be null.";
	}
}
