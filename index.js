$(document).ready(function(){
    expressionRegister("#op1 + #op2 + #op3 = #result");
})

const ID_REGEX = /#[\d\w]+/g;

function expressionRegister(exp){
    var leftExp = exp.substring(0, exp.indexOf('='));
    var rightExp = exp.substring(exp.indexOf('=')+1, exp.length);

    var outIDs = rightExp.match(ID_REGEX);
    if(outIDs.length < 1){
        throw " Invalid number of ID on the right of = symbol"
    }
    var $outs = $(outIDs.join(','));

    //extract the fields 
    var inIDs = leftExp.match(ID_REGEX);
    var $ins = $(inIDs.join(','));

    //if in fields is less than 1
    if($ins.length < 1){
        throw "Invalid IDs on the left of = symbol"
    }


    //add event listener to detect the changes on the fields
    $ins.on('change', function(){
        var out = 0;

        $outs.val(out);
    })
}

function expTreeEval(root){
    if(!root){
        return 0;
    }

    if(!root.left && !root.right){
        return root.value;
    }

    var left = expTreeEval(root.left);
    var right = expTreeEval(root.right);

    if(root.operator == '+'){
        return left + right;
    }else if(root.operator == '-'){
        return left - right;
    }else if(root.operator == '*'){
        return left * right;
    }else if(root.operator == '/'){
        return left / right;
    }
}

//it replaces ID selectors in the expression with matched values in $ins
function replaceIdsWithValue(exp, $ins){
    $ins.each(function(i){
        var id = $(this).prop('id');
        var value = $(this).val();
        if(id){
            //convert all invalid value into 0
            if(!value){

            }
            exp.replace(id, )
        }
    })

}