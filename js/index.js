$(document).keypress(function(e) {
    if(e.which == 13) {
        $('#findSummoner').click();
    }
});

function findSummoner() {
  clearFields();
  summonerStats();
}

function clearFields() {
 $('.stats').text('');
}

function summonerStats() {
  
var apiKey = '06c629b0-6005-4334-9a36-b7e94fa3869c'; 
var sumName = $('#sumName').val(); 

  //AJAX call to retrieve Summoner Name, Level and ID
    $.ajax({
        url: 'https://na.api.pvp.net/api/lol/na/v1.4/summoner/by-name/' + sumName + '?api_key=' + apiKey,
        type: 'GET',
        datatype: 'json',
        data: {},
        success: function (json) {
           var summonerName = json[sumName].name;
           var summonerLevel = json[sumName].summonerLevel;
           var summonerId = json[sumName].id;
          $(':input').removeClass('failure').addClass('success');
         
          duration(summonerId, apiKey);
          dmgDealt(summonerId, apiKey);
          dmgTaken(summonerId, apiKey);
          greenWards(summonerId, apiKey);
          pinkWards(summonerId, apiKey);
          kills(summonerId, apiKey);
          deaths(summonerId, apiKey);
          goldEarned(summonerId, apiKey);
      	  },//end success
      error: function() {
      $(':input').removeClass('success').addClass('failure');
    }
			});//end NAME AJAX
}//end findSummoner

//Last 5 game stats (Ranked for testing purposes)
function duration(summonerId, apiKey) {
    $.ajax({
        url: 'https://na.api.pvp.net/api/lol/na/v2.2/matchhistory/' + summonerId + '?rankedQueues=RANKED_SOLO_5x5&endIndex=5&api_key=' + apiKey,
        type: 'GET',
        dataType: 'json',
        data: {},
        success: function (json) {
          var sum = 0;
          for(i=0; i < json.matches.length; i++) {
            sum += json.matches[i].matchDuration;
          	}
          document.getElementById('duration').innerHTML = sum + ' seconds';
					}
    });
}

function dmgDealt(summonerId, apiKey) {
    $.ajax({
        url: 'https://na.api.pvp.net/api/lol/na/v2.2/matchhistory/' + summonerId + '?rankedQueues=RANKED_SOLO_5x5&endIndex=5&api_key=' + apiKey,
        type: 'GET',
        dataType: 'json',
        data: {},
        success: function (json) {
          var sum = 0;
          for (i=0; i<json.matches.length; i++) {
          sum += json.matches[i].participants[0].stats.totalDamageDealt;
          }
          document.getElementById('dmgDealt').innerHTML = sum;
			 }
    });
}

function dmgTaken(summonerId, apiKey) {
    $.ajax({
        url: 'https://na.api.pvp.net/api/lol/na/v2.2/matchhistory/' + summonerId + '?rankedQueues=RANKED_SOLO_5x5&endIndex=5&api_key=' + apiKey,
        type: 'GET',
        dataType: 'json',
        data: {},
        success: function (json) {
          var sum = 0;
          for (i=0; i<json.matches.length; i++) {
          sum += json.matches[i].participants[0].stats.totalDamageTaken;
          }
          document.getElementById('dmgTaken').innerHTML = sum;
			 }
					}
           );
}

function greenWards(summonerId, apiKey) {
    $.ajax({
        url: 'https://na.api.pvp.net/api/lol/na/v2.2/matchhistory/' + summonerId + '?rankedQueues=RANKED_SOLO_5x5&endIndex=5&api_key=' + apiKey,
        type: 'GET',
        dataType: 'json',
        data: {},
        success: function (json) {
          var sum = 0;
          for (i=0; i<json.matches.length; i++) {
          sum += json.matches[i].participants[0].stats.wardsPlaced;
          }
          
          document.getElementById('greenWards').innerHTML = sum;
			 }
    });
}

function pinkWards(summonerId, apiKey) {
    $.ajax({
        url: 'https://na.api.pvp.net/api/lol/na/v2.2/matchhistory/' + summonerId + '?rankedQueues=RANKED_SOLO_5x5&endIndex=5&api_key=' + apiKey,
        type: 'GET',
        dataType: 'json',
        data: {},
        success: function (json) {
          var sum = 0;
          for (i=0; i<json.matches.length; i++) {
          sum += json.matches[i].participants[0].stats.visionWardsBoughtInGame;
          }
          document.getElementById('pinkWards').innerHTML = sum;
        }
    });
}

function kills(summonerId, apiKey) {
    $.ajax({
        url: 'https://na.api.pvp.net/api/lol/na/v2.2/matchhistory/' + summonerId + '?rankedQueues=RANKED_SOLO_5x5&endIndex=5&api_key=' + apiKey,
        type: 'GET',
        dataType: 'json',
        data: {},
        success: function (json) {
          var sum = 0;
          for (i=0; i<json.matches.length; i++) {
          sum += json.matches[i].participants[0].stats.kills;
          }
          document.getElementById('kills').innerHTML = sum;
        }
    });
}

function deaths(summonerId, apiKey) {
    $.ajax({
        url: 'https://na.api.pvp.net/api/lol/na/v2.2/matchhistory/' + summonerId + '?rankedQueues=RANKED_SOLO_5x5&endIndex=5&api_key=' + apiKey,
        type: 'GET',
        dataType: 'json',
        data: {},
        success: function (json) {
          var sum = 0;
          for (i=0; i<json.matches.length; i++) {
          sum += json.matches[i].participants[0].stats.deaths;
          }
          document.getElementById('deaths').innerHTML = sum;
        }
    });
}

function goldEarned(summonerId, apiKey) {
    $.ajax({
        url: 'https://na.api.pvp.net/api/lol/na/v2.2/matchhistory/' + summonerId + '?rankedQueues=RANKED_SOLO_5x5&endIndex=5&api_key=' + apiKey,
        type: 'GET',
        dataType: 'json',
        data: {},
        success: function (json) {
          var sum = 0;
          for (i=0; i<json.matches.length; i++) {
          sum += json.matches[i].participants[0].stats.goldEarned;
          }
          document.getElementById('gold').innerHTML = sum;
        }
    });
  }


