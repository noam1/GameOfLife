
function gen_table(width, height)
{
    var resultHTML = "";

    for(var y = 0; y < height; y++)
    {
        resultHTML += "<tr>";

        for(var x = 0; x < width; x++)
        {
            resultHTML += "<td id=\"cell_" + x + "_" + y + "\">";
        }
    }
}

$(document).ready(function() {
    
});