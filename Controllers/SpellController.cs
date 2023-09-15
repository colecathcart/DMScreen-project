using Microsoft.AspNetCore.Mvc;
namespace reactnet.Controllers
{
	[ApiController]
	[Route("[controller]")]

	public class SpellController : ControllerBase
	{

		[HttpGet("{getid}")]
		public Spell Get(string getid)
		{
			//stand-in for API call to https://www.dnd5eapi.co/api/
			Spell acidarrowexample = new Spell(
				"acid-arrow",
				"Melf's Acid Arrow",
				"90 feet",
				"1 action",
				"A shimmering green arrow streaks toward a target within range and bursts in a spray of acid. Make a ranged spell attack against the target. On a hit, the target takes 4d4 acid damage immediately and 2d4 acid damage at the end of its next turn. On a miss, the arrow splashes the target with acid for half as much of the initial damage and no damage at the end of its next turn.",
				"V,S,M (powdered rhubard leaf and an adder's stomach)",
				"2nd-level evocation");
			Spell truestrikeexample = new Spell(
				"true-strike",
				"True Strike",
				"30 feet",
				"1 action",
				"You extend your hand and point a finger at a target in range. Your magic grants you a brief insight into the target's defenses. On your next turn, you gain advantage on your first attack roll against the target, provided that this spell hasn't ended.",
				"S",
				"cantrip divination");
			Spell invisibilityexample = new Spell(
				"invisibility",
				"Invisibility",
				"Touch",
				"1 action",
				"A creature you touch becomes invisible until the spell ends. Anything the target is wearing or carrying is invisible as long as it is on the target's person. The spell ends for a target that attacks or casts a spell.",
				"V,S,M (An eyelash encased in gun arabic)",
				"2nd-level illusion"
			);

			Spell[] examplespells = {acidarrowexample,truestrikeexample,invisibilityexample};
			
			foreach(Spell s in examplespells)
			{
				if(s.id == getid)
				{
					return s;
				}

			}
			return acidarrowexample;
		}
	}
}