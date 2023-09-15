namespace reactnet
{
	public class Spell
	{
		public string id {get; set;}
		public string name {get; set;}
		public string range {get; set;}
		public string casttime {get; set;}
		public string description {get; set;}
		public string components {get; set;}
		public string metadata {get; set;}

		public Spell(string _id, string n, string rng, string ct, string desc, string comp, string meta)
		{
			id = _id;
			name = n;
			range = rng;
			casttime = ct;
			description = desc;
			components = comp;
			metadata = meta;
		}
	}
}