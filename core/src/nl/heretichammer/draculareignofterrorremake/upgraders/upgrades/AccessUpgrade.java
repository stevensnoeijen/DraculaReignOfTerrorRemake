package nl.heretichammer.draculareignofterrorremake.upgraders.upgrades;

public class AccessUpgrade extends AbstractUpgrade<AccessUpgrade.AccessUpgradeData> {

	public AccessUpgrade(AccessUpgradeData data) {
		super(data);
	}
	
	@Override
	protected void upgrade() {
		for(String access : data.accesses) {
			getTeam().putProperty(access, true);
		}
	}	
	
	public static class AccessUpgradeData extends Upgrade.UpgradeData {
		public String[] accesses;
	}
}
