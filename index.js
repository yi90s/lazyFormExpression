$(document).ready(function(){
    expressionRegister("#op1 + #op2 + #op3 = #result");
})

const ID_REGEX = /#[\d\w]+/g;
const SUP_OPERATION = ['<', '>' ,'='];

function expressionRegister(exp){

    if(exp.indexOf('=') != -1){
        var leftExp = exp.substring(0, exp.indexOf('='));
        var rightExp = exp.substring(exp.indexOf('=')+1, exp.length);
        var outIDs = rightExp.match(ID_REGEX);
        var inIDs = leftExp.match(ID_REGEX);
        var $outs = $(outIDs.join(','));
        var $ins = $(inIDs.join(','));
    
        //add event listener to detect the changes on the fields
        $ins.on('change', function(){
            var mathExp = replaceIdsWithValue(leftExp, $ins);
            var out = expTreeEval(jsep(mathExp));
            $outs.val(out);
        })

    }else if(exp.indexOf('<') != -1 || exp.indexOf('>') != -1){

    }

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
    var newExp = exp;
    $ins.each(function(i){
        var id = $(this).prop('id');
        var value = $(this).val();
        if(id){
            //convert all invalid value into 0
            if(!value){
                value = '0';
            }
            newExp.replace(id, value);
        }
    })

    return newExp; 
}