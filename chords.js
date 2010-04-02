$(function() {
  $("#chords section").hide();

  $('#find #chord').blur(function() {
    $(".chord pre").hide();
    var wanted_chord = findChordSelectors(normalizeChordName($(this).val()));
    console.log(wanted_chord)
    $(wanted_chord).show();
    $(wanted_chord + ' pre').show();
    $(wanted_chord).parent().show();
    $(wanted_chord).parent().parent().show();
  });       
  
  $("#find #chord").focus(function() {this.value = '';})
  
  $('#find').submit(function() {
    $('#find #chord').blur(); return false;
  });
  
  function normalizeChordName(name) {
    form = /([A-H][#|b]?)(maj|M|min|m|\-)?(aug|\+|dim|º|\([b|♭]5\))?(\d)?(sus4|sus2|add9|add11)?/
    parts = name.match(form);
    parts.shift();
    return parts;
  } // http://en.wikipedia.org/wiki/Chord_notation
  
  function findChordSelectors(chord_array) {
    // [root, (major, minor), (aug, dim), (seventh, five), (sus,add)]
    transforms = [
      function(rt) { return $.string(rt).gsub('#', 's').str; },
      function(mm) { return mm.match(/^(min|m|-)$/) ? 'minor' : 'major' },
      function(ad) { return (ad == 'aug' || ad == '+') ? 'aug' : 'dim'},
      function(sf) { return (sf == '7') ? 'seventh' : 'five' },
      function(sa) { return sa }
    ]
    
    if(chord_array[1] == undefined && chord_array[2] == undefined && chord_array[4] == undefined)
      chord_array[1] = 'maj';
    
    sel = $.map(chord_array, function(part, i) {
      return (part != undefined) ? "." + transforms[i](part) : '';
    });
    
    return sel.join(' ');
  }
  
  $.each(["Cmin(b5)", "Cmin(♭5)", "D#", "Cadd9", "G7add9"], function(i, chord) {
    n_chor = normalizeChordName(chord);
    console.log(chord + " => " + n_chor + " => " + findChordSelectors(n_chor));
  });
  
  window.navigator.standalone = true;
});