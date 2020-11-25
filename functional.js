$(document).ready(function(){
    generateGrid(41, 75);
    $('#20-10').toggleClass('unvisited start-node').attr('tooltip', 'Row: 20, Column: 10');
    $('#20-60').toggleClass('unvisited end-node').attr('tooltip', 'Row: 20, Column: 60');  
    $(document).click(function(e){
        $('.dropdown').remove();
        $('.button-down').toggleClass("button-down button");
        if ($('.dropdown').length == 0){
            $('.button').click(function(event){
                $('.dropdown').remove();
                $('.button-down').toggleClass("button-down button");
                if (!$(event.target).attr("id")) {
                    var dropdown_options = $(event.target).attr('dropdown-field');
                    var y = event.pageY
                    var x = event.pageX
                    $(event.target).toggleClass("button button-down");
                    $("#body").append("<div class='dropdown'>" + dropdown_options + "</div>");
                    $('.dropdown').css({left: x, top: y})
                    return false
                }
            })  
        }
    })

    $('[tooltip]').mousemove(function(event){
    var tooltip_text = $(event.target).attr('tooltip');
        if ($(".tooltip").length <= 0) {
            $("#body").append("<div class='tooltip'>" + tooltip_text + "</div>");
                var top_pos = event.pageY
                var x_pos = event.pageX
                $('.tooltip').css({left: x_pos, top: top_pos})
        }
        else {
            $(".tooltip").remove(); 
            $("#body").append("<div class='tooltip'>" + tooltip_text + "</div>");{
                var top_pos = event.pageY
                var x_pos = event.pageX
                $('.tooltip').css({left: x_pos, top: top_pos})
            }
        }
    })
    $('[tooltip]').mouseleave(function(){
        $(".tooltip").remove();
    })
});

function generateGrid(gHeight, gWidth) {
    // Create Grid Based on input
    MakeRows(gHeight)
    makeColumns(gWidth)
}

function MakeRows(rowNum) {
    // create Rows
    var grid = document.getElementById('grid');
    for (r = 0; r < rowNum; r++) {
        var row = document.createElement("tr");
        grid.appendChild(row).setAttribute('id', 'row ' + r);
    }
}

function makeColumns(colNum){
    // create Columns
    var grid = document.getElementById('grid').children;
    for (r=0; r < grid.length; r++){
        for (c = 0; c < colNum; c++){
            var newCol = document.createElement('td');
            newCol.id = r + "-" + c;
            newCol.className = "unvisited";
            // newCol.className = string("Row: " + r , "Column: " + c);
            grid[r].appendChild(newCol);
        }
    }
}