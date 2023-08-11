class Account{
    constructor(no,name,bal,trans){
        this.acc_no=no;
        this.acc_name=name;
        this.acc_bal=bal;
        this.transaction=trans;
    }

    show_bal(){
        return this.acc_bal;
    }

    deposit_amt(d_amt){
        this.acc_bal+=d_amt;
        return this.acc_bal;
    }

    withdraw_amt(w_amt){
        if(this.acc_bal>w_amt){
            this.acc_bal-=w_amt;
            return this.acc_bal;
        }
        else{
            return "You dont have enough balance!!!!";
        }
    }
}



const users=[];

function createAcc(){
    let no=document.getElementById("acc_num").value;
    let name=document.getElementById("acc_name").value;
    let bal=Number(document.getElementById("acc_bal").value);
    let trans=[`<tr><td>${get_date()} ${get_time()}</td><td>Account created</td><td>${bal}</td></tr>`];

    if(checkAcc_no(no)){
        let user=new Account(no,name,bal,trans);
        users.push(user);

         console.log(users);

        //console.log(users[0].transaction);

        document.getElementById("acc_num").value="";
        document.getElementById("acc_name").value="";
        document.getElementById("acc_bal").value="";
        document.getElementById("reg_msg").innerHTML="";
    }else{
        document.getElementById("reg_msg").innerHTML="This Account number is already taken<br>Enter another account number"
    }
    
}

function randomAcc_no(){
    let n=(Math.floor(Math.random()*898))+101;

    if(checkAcc_no(n)){
        document.getElementById("acc_num").value=n;
        return;
    }else{
        randomAcc_no();
    }
}

function checkAcc_no(acc_no){
    let check=true;
    for(let user of users){
        if(user.acc_no===acc_no){
            check=false;
            return check;
        }
        else{
            check=true;
        }
    }
    return check;
}

function show_bal(){
    let acc_n=document.getElementById("sh_bal").value;
    let text="";
    for(let user of users){
        if(user.acc_no===acc_n){
            text=user.show_bal();
            break;
        }
        else{
            text="Please Enter correct account number!!!"
        }
    }
    document.getElementById("print_bal").innerText=text;
    document.getElementById("sh_bal").value="";
}

function deposit(){
    let acc_no=document.getElementById("d_acc_no").value;
    let amt=parseInt(document.getElementById("d_amt").value);
    let text="";
    let trans="";
    for(let user of users){
        if(user.acc_no===acc_no){
            //user.acc_bal+=amt;
            text="New Balance:"+user.deposit_amt(amt);
            trans=`<tr><td>${get_date()} ${get_time()}</td><td>${amt} deposited</td><td>${user.acc_bal}</td></tr>`;
            user.transaction.push(trans);
            document.getElementById("d_acc_no").value="";
            document.getElementById("d_amt").value="";
            break;
        }
        else{
            text="Please Enter correct account number!!!";
        }
    }
    document.getElementById("d_bal").innerText=text;

}

function withdraw(){
    let acc_no=document.getElementById("w_acc_no").value;
    let amt=parseInt(document.getElementById("w_amt").value);
    let text="";
    let trans="";
    for(let user of users){
        if(user.acc_no===acc_no){
            // if(amt>user.acc_bal){
            //     text="You dont have enough balance!!!!"
            //     break;
            // }else{
            //     user.acc_bal-=amt;
            //     text="New Balance:"+user.acc_bal;
            //     document.getElementById("w_acc_no").value="";
            //     document.getElementById("w_amt").value="";
            //     break;
            // } 
            text=user.withdraw_amt(amt);
            trans=`<tr><td>${get_date()} ${get_time()}</td><td>${amt} is withdrawl</td><td>${user.acc_bal}</td></tr>`;
            user.transaction.push(trans);
            document.getElementById("w_acc_no").value="";
            document.getElementById("w_amt").value="";
            break;
        }
        else{
            text="Please Enter correct account number!!!";
        }
    }
    document.getElementById("w_bal").innerText=text;

}

function transfer(){
    let acc_no1=document.getElementById("acc_no1").value;
    let acc_no2=document.getElementById("acc_no2").value;
    let t_amt=Number(document.getElementById("t_amt").value);
    let text="";
    let trans1="";
    let trans2="";

    for(let user1 of users){
        if(user1.acc_no===acc_no1){
            if(user1.acc_bal<t_amt){
                text="You dont have enough balance to transfer this amount!!!"
                break;
            }else{
                for(let user2 of users){
                    if(user2.acc_no===acc_no2){
                        user1.acc_bal-=t_amt;
                        user2.acc_bal+=t_amt;
                        text="Transfer Successful!"
                        trans1=`<tr><td>${get_date()} ${get_time()}</td><td>${t_amt} Transfered to Account no ${user2.acc_no}</td><td>${user1.acc_bal}</td></tr>`;
                        trans2=`<tr><td>${get_date()} ${get_time()}</td><td>${t_amt} Transfered from Account no ${user1.acc_no}</td><td>${user2.acc_bal}</td></tr>`;
                        user1.transaction.push(trans1);
                        user2.transaction.push(trans2);
                        document.getElementById("acc_no1").value="";
                        document.getElementById("acc_no2").value="";
                        document.getElementById("t_amt").value="";
                        break;
                    }else{
                        text="Please check second account number!!!";
                    }
                }
                break;
            }   
        }else{
            text="Please check Your account Number!!!";
        }
    }
    document.getElementById("t_text").innerText=text
}

function print_all_details(){
    let text=""
    for(let user of users){
        text+=`<li>Account No.:${user.acc_no}  Name:${user.acc_name}  Balance:${user.acc_bal}</li>`;
    }
    document.getElementById("all_acc_det").innerHTML=text;
}

function print_user_details(){
    let acc_no=document.getElementById("user_det").value;
    let user=find_user(acc_no);
    if(user){
        document.getElementById("print_user").innerHTML=`Account No.: ${user.acc_no}<br>Account Name: ${user.acc_name}<br>Account Balance: ${user.acc_bal}`;
    }else{
        document.getElementById("print_user").innerHTML="Please check Your account Number!!!";
    }
}

function print_transaction(){
    let acc_no=document.getElementById("t_acc_no").value;
    let text="<table border='2px solid black'><tr><td>Date & Time</td><td>Transaction</td><td>Balance</td></tr>";

    for(let user of users){
        if(user.acc_no===acc_no){
            for(let t of user.transaction){
                text+=t;
            }
            text+="</table>";
            document.getElementById("print_trans").innerHTML=text;
        }
    }
}

function get_date(){
    let d=new Date();
    console.log(d.toDateString());
    return d.toDateString();
}

function get_time(){
    let t=new Date();
    return t.toLocaleTimeString();
}

function find_user(acc_no){
    for(let user of users){
        if(user.acc_no===acc_no){
            return user;
        }
    }
    return false;
}