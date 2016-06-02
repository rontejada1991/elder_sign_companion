var investigatorCount = 0;

// Investigator object
function Investigator(name, profession, sanity, stamina, clues) {
  this.name = name;
  this.profession = profession;
  this.sanity = sanity;
  this.stamina = stamina;
  this.clues = clues;
}

// Contains all investigators
var investigators = [
  new Investigator("Akachi Onyele", "The Shaman", 6, 4, 0),
  new Investigator("Amanda Sharpe", "The Student", 5, 5, 0),
  new Investigator("\"Ashcan\" Pete", "The Drifter", 4, 6, 0),
  new Investigator("Bob Jenkins", "The Salesman", 4, 6, 0),
  new Investigator("Carolyn Fern", "The Psychologist", 6, 4, 0),
  new Investigator("Darrell Simmons", "The Photographer", 4, 6, 0),
  new Investigator("Dexter Drake", "The Magician", 5, 5, 0),
  new Investigator("Diana Stanley", "The Redeemed Cultist", 4, 6, 1),
  new Investigator("Finn Edwards", "The Bootlegger", 5, 5, 1),
  new Investigator("Harvey Walters", "The Professor", 7, 3, 0),
  new Investigator("Gloria Goldberg", "The Author", 6, 4, 0),
  new Investigator("Jacqueline Fine", "The Psychic", 7, 3, 0),
  new Investigator("Jenny Barnes", "The Dilettante", 6, 4, 0),
  new Investigator("Jim Culver", "The Musician", 6, 4, 0),
  new Investigator("Joe Diamond", "The Private Eye", 4, 6, 1),
  new Investigator("Kate Winthrop", "The Scientist", 6, 4, 0),
  new Investigator("Leo Anderson", "The Expedition Leader", 5, 5, 1),
  new Investigator("Mandy Thompson", "The Researcher", 5, 5, 1),
  new Investigator("Marie Lambeau", "The Entertainer", 6, 4, 0),
  new Investigator("Mark Harrigan", "The Soldier", 3, 7, 0),
  new Investigator("Michael McGlen", "The Gangster", 3, 7, 0),
  new Investigator("Monterey Jack", "The Archaeologist", 3, 7, 0),
  new Investigator("Normal Withers", "The Astronomer", 7, 3, 0),
  new Investigator("Patrice Hathaway", "The Violinist", 6, 4, 2),
  new Investigator("Rita Young", "The Athlete", 4, 6, 0),  
  new Investigator("Sister Mary", "The Nun", 7, 3, 0),
  new Investigator("\"Skids\" O\'Toole", "The Ex-Convict", 3, 7, 0),
  new Investigator("Tommy Muldoon", "The Rookie Cop", 4, 6, 1),
  new Investigator("Trish Scarborough", "The Spy", 5, 5, 1),  
  new Investigator("Vincent Lee", "The Doctor", 5, 5, 0),
  new Investigator("William Yorick", "The Gravedigger", 4, 6, 0),
  new Investigator("Wilson Richards", "The Handyman", 5, 5, 1),
];

$(function() {
  // Populates dropdown with all investigators
  investigators.forEach(function(currentInvestigator) {
    $("select").append("<option>" + currentInvestigator.name + "</option>");
  });

  $("select").change(function() {
    addInvestigator($(this).val());
  });

  $("#investigators").on("click", ".fa-times", function() {
    $(this).parent().addClass("empty");
    investigatorCount--;
  });

  $("#investigators").on("click", ".fa-plus-square", function() {
    changeValue($(this).prev().prev(), true);
  });

  $("#investigators").on("click", ".fa-minus-square", function() {
    changeValue($(this).prev().prev().prev(), false);
  });

  $("#random_investigator").on("click", function() {
    // obtain all investigator options that are not disabled
    var list = $("option[disabled!='disabled']");
    // generate a random number from 0 to the list length
    var selected = Math.floor(Math.random() * list.length);
    // find the investigator using their name
    addInvestigator(list[selected].textContent);
  });

  $("#reset_button").on("click", function() {
    // Obtain all investigators and remove disabled class,
    // except for the first one
    $("option").prop("disabled", false);
    // The first option should be disabled since it was enabled
    $("option:first").attr("disabled", true);
    // Change the value of the select
    $("select").val("Select Investigator");
    // Remove all investigators
    $("#investigators").empty();
    // Reset investigator count to 0
    investigatorCount = 0;
  });

  $("#about_button").on("click", function() {
    $("#about").toggleClass("hidden");
  });

});

function findInvestigator(investigatorName) {
  var selectedInvestigator;
  investigators.forEach(function(currentInvestigator) {
    if (currentInvestigator.name === investigatorName) {
      selectedInvestigator = currentInvestigator;
    }
  });

  return selectedInvestigator;
}

// Modifies the element value
function changeValue(element, increase) {
  var currValue = parseInt(element.text());
  // Increase or decrease the current value by 1 based on parameter
  currValue += increase ? 1 : -1;
  // Sets the current value on the element, unless it is below 0
  // or over 9, then it will set it to those values instead
  if (currValue < 0) {
    element.text(0);
  } else if (currValue > 9) {
    element.text(9);
  } else {
    element.text(currValue);
  }
}

function addInvestigator(investigatorName) {
  // Adds a new investigator if there are less than 8 investigators currently
  if (investigatorCount < 8) {
    generateInvestigatorDiv();

    // Select the first empty investigator div
    var investDiv = $(".investigator.empty").first();

    // Find the data for the selected investigator option
    var investData = findInvestigator(investigatorName);

    // Populate the investigator div with the selected investigators data
    investDiv.find(".name").text(investData.name);
    investDiv.find(".profession").text(investData.profession);
    investDiv.find(".sanity").text(investData.sanity);
    investDiv.find(".stamina").text(investData.stamina);
    investDiv.find(".clues").text(investData.clues);
    investDiv.removeClass("empty");

    // Disable the investigator option selected
    $("option:contains('" + investigatorName + "')").attr("disabled", true);

    // Increase investigator count by 1
    investigatorCount++;
  }
}

function generateInvestigatorDiv() {
  // Creates a new empty investigator div if there isn't an empty one available
  if ($(".investigator.empty").length === 0) {
    var investNum = $(".investigator").length + 1;

    // Create a new empty investigator div
    $("#investigators").append(
    "<div class='investigator empty col-xs-6 col-sm-6 col-md-4 col-lg-3'>" +
      "<span id='investigator_num'>" + investNum + ". </span><span class='name'>Name</span>" +
        "<i class='fa fa-times fa-lg' aria-hidden='true'></i><br>" +
      "<span class='sanity'>Sanity</span><i class='fa fa-eye fa-2x' aria-hidden='true'></i><i class='fa fa-plus-square fa-2x' aria-hidden='true'></i>" + 
        "<i class='fa fa-minus-square fa-2x' aria-hidden='true'></i><br>" +
      "<span class='stamina'>Stamina</span><i class='fa fa-heartbeat fa-2x' aria-hidden='true'></i><i class='fa fa-plus-square fa-2x' aria-hidden='true'></i>" + 
        "<i class='fa fa-minus-square fa-2x' aria-hidden='true'></i><br>" +
      "<span class='clues'>Clues</span><i class='fa fa-search fa-2x' aria-hidden='true'></i></i><i class='fa fa-plus-square fa-2x' aria-hidden='true'></i>" + 
        "<i class='fa fa-minus-square fa-2x' aria-hidden='true'></i>" +
    "</div>");
  }
}