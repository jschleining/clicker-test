var attributes = [];



function Attribute()
{
	this.ID = 0;
	this.Name = "Attribute";
	this.Description = "Description";
	this.Value = 0;
}



// Initialize Attributes
function InitializeAttributes()
{
	LoadAttribute(0, "Body", "B", RandomInt(3, 18));
	LoadAttribute(1, "Strength", "S", RandomInt(3, 18));
	LoadAttribute(2, "Mind", "M", RandomInt(3, 18));
	
	for(var i = 0; i < attributes.length; i++)
	{
		UpdateAttributeDisplay(i)
	}
	
	UpdateAttributeTotalDisplay(CalculateTotal());
}

// Load an Attribute into the attributes array
function LoadAttribute(_id, _name, _description, _value)
{
	var cur = attributes.length;
	
	attributes[cur] = new Attribute();
	attributes[cur].ID = _id;
	attributes[cur].Name = _name;
	attributes[cur].Description = _description;
	attributes[cur].Value = _value;
	//alert(_id + " || " + _name + " || " + _value);
}

function UpdateAttributeDisplay(id)
{
	$('#att_' + id).find('.label').text(attributes[id].Name);
	$('#att_' + id).find('.value').text(attributes[id].Value);
}

function UpdateAttributeTotalDisplay(t)
{
	$('#att_total').find('.label').text('Total: ');
	$('#att_total').find('.value').text(t);
}

function RerollAttributes()
{
	for(var i = 0; i < attributes.length; i++)
	{
		attributes[i].Value = RandomInt(3, 18);
		UpdateAttributeDisplay(i);
	}
	UpdateAttributeTotalDisplay(CalculateTotal());
}

function RandomInt(_min, _max)
{
	return Math.floor(Math.random() * (_max - _min + 1)) + _min;
}

function CalculateTotal()
{
	t = 0;
	for(var i = 0; i < attributes.length; i++)
	{
		t += attributes[i].Value;
	}
	return t;
}

$('#att_gen_btn').click(function(){
	RerollAttributes();
});




//Run this code once the page has loaded fully
window.onload = function()
{
	InitializeAttributes();
	$( "#race" ).selectmenu();
};