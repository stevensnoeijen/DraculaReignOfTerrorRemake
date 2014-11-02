package nl.heretichammer.draculareignofterrorremake.models.upgraders.upgrades;

public class AccessUpgrade extends AbstractUpgrade<AccessUpgrade.AccessUpgradeData> {

	public AccessUpgrade(AccessUpgradeData data) {
		super(data);
	}
	
	@Override
	protected void upgrade() {
		for(String access : data.accesses) {
			getTeam().putAccessibility(access, true);
		}
	}	
	
	public static class AccessUpgradeData extends Upgrade.UpgradeData {
		public String[] accesses;
	}
}
