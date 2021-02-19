
// particlesJS("particles-js", {"particles":{"number":{"value":28,"density":{"enable":true,"value_area":394.57382081613633}},"color":{"value":"#00f"},"shape":{"type":"circle","stroke":{"width":0,"color":"#000000"},"polygon":{"nb_sides":5},"image":{"src":"img/github.svg","width":100,"height":100}},"opacity":{"value":0.12025590456491421,"random":false,"anim":{"enable":false,"speed":1,"opacity_min":0.1,"sync":false}},"size":{"value":28.05971106514665,"random":true,"anim":{"enable":false,"speed":40,"size_min":0.1,"sync":false}},"line_linked":{"enable":false,"distance":150,"color":"#ffffff","opacity":0.4,"width":1},"move":{"enable":true,"speed":6,"direction":"none","random":false,"straight":false,"out_mode":"out","bounce":false,"attract":{"enable":false,"rotateX":600,"rotateY":1200}}},"interactivity":{"detect_on":"canvas","events":{"onhover":{"enable":true,"mode":"repulse"},"onclick":{"enable":true,"mode":"push"},"resize":true},"modes":{"grab":{"distance":400,"line_linked":{"opacity":1}},"bubble":{"distance":400,"size":40,"duration":2,"opacity":8,"speed":3},"repulse":{"distance":200,"duration":0.4},"push":{"particles_nb":4},"remove":{"particles_nb":2}}},"retina_detect":true});


const addcartbuttons = document.querySelectorAll('.addcart');
const cartitemscontainer = document.querySelector('.cartitems');
const phase1 = document.querySelector('.phase1');
const phase2 = document.querySelector('.phase2');
const checkoutButton = document.querySelector('#checkout_button');

const restartEverything = () => {
    $('.cartitems').find('.item').remove();
    $('#totalprice').text(0);
    checkoutButton.innerHTML = "Checkout";
    $('.phase3').removeClass('activate');
    $('.phase3').addClass('deactivate');
    setTimeout(()=>{
        phase2.classList.remove('activate')
        phase2.classList.add('deactivate');
        setTimeout(()=>{
            phase1.classList.remove('deactivate')
            phase1.classList.add('activate')    
        },550);
    },550)
    
}

const cancelPurchasee = () => {
    phase2.classList.remove('activate')
    phase2.classList.add('deactivate');
    setTimeout(()=>{
        phase1.classList.remove('deactivate')
        phase1.classList.add('activate')    
    },200);
}
const activatePase2 = () => {
    phase1.classList.remove('activate')
    phase1.classList.add('deactivate');
    setTimeout(()=>{
        phase2.classList.remove('deactivate')
        phase2.classList.add('activate');
    },200)
}

checkoutButton.addEventListener('click',(e)=>{
    isFullyOpened = checkoutButton.getAttribute('attr-isFullyOpened');
    if(isFullyOpened == "true"){
        activatePase2();
        checkoutButton.innerHTML = "Cancel";
        checkoutButton.setAttribute('attr-isFullyOpened','false')
    }else{
        cancelPurchasee();
        checkoutButton.innerHTML = "Checkout" 
        checkoutButton.setAttribute('attr-isFullyOpened','true')
    }
    
   
})

let totalRate = 0;

const increment = (e) => {
    const inceBtn = e.target;
    const sinlePrice = parseInt(inceBtn.getAttribute('attr-single_rate'));
    totalRate += sinlePrice;
    document.getElementById('totalprice').innerHTML = totalRate.toLocaleString();
    const unitHolder = inceBtn.previousSibling;
    const currentUnnit = unitHolder.innerHTML;
    unitHolder.innerHTML = parseInt(currentUnnit)+1;
    const rateHolder = inceBtn.parentNode.nextSibling;
    const currentRate = rateHolder.getAttribute('attr-actualrate');
    const updatedRate = parseInt(currentRate)+parseInt(sinlePrice);
    rateHolder.setAttribute('attr-actualrate',updatedRate);
    rateHolder.innerHTML = "₹"+updatedRate.toLocaleString();

}

const decrement = (e) => {
    const decreBtn = e.target;
    const sinlePrice = parseInt(decreBtn.getAttribute('attr-single_rate'));
    totalRate -= sinlePrice;
    document.getElementById('totalprice').innerHTML = totalRate.toLocaleString();
    const unitHolder = decreBtn.nextSibling;
    const currentUnnit = unitHolder.innerHTML;
    unitHolder.innerHTML = parseInt(currentUnnit)-1;
    const rateHolder = decreBtn.parentNode.nextSibling;
    const currentRate = rateHolder.getAttribute('attr-actualrate');
    const updatedRate = parseInt(currentRate)-parseInt(sinlePrice);
    rateHolder.setAttribute('attr-actualrate',updatedRate);
    rateHolder.innerHTML = "₹"+updatedRate.toLocaleString();
}


const createCartItem = (p_rate,p_name,p_id) => {
    //maincontainer
    const itemcontainer = document.createElement('div');
    itemcontainer.classList.add('item')

    //image
    const itemimage = document.createElement('div');
    itemimage.classList.add('itemimg')
    const imagecontainer = document.createElement('div');
    imagecontainer.classList.add('imgholder');
    imagecontainer.style.backgroundImage = 'url(../images/s0'+p_id+'.jpg)'
    itemimage.append(imagecontainer)
    itemcontainer.append(itemimage);

    //details
    const itemdetails = document.createElement('div');
    itemdetails.classList.add('itemdetails')
    const itemname = document.createElement('div');
    itemname.classList.add('itemname')
    const itemnamesmall = document.createElement('small');
    itemnamesmall.innerHTML = p_name;
    itemname.append(itemnamesmall)
    itemdetails.append(itemname);

    //qty and price
    const itemqtyprice = document.createElement('div');
    itemqtyprice.classList.add('itemqtyprice')
    itemqtyprice.classList.add('unselectable')
    const qty = document.createElement('div');

    //qty
    qty.classList.add('qty')
    const span1 = document.createElement('span');
    span1.classList.add('decrement');
    span1.addEventListener('click',(ev) => decrement(ev))
    span1.setAttribute("attr-single_rate",parseInt(p_rate));
    
    span1.innerHTML = '-';

    const span2 = document.createElement('span');
    span2.innerHTML = '1';
    
    const span3 = document.createElement('span');
    span3.classList.add('increment');
    span3.setAttribute("attr-single_rate",parseInt(p_rate));
    span3.addEventListener('click',(ev) => increment(ev))
    span3.innerHTML = '+';

    qty.append(span1);
    qty.append(span2);
    qty.append(span3);
    itemqtyprice.append(qty);
    
    //rate
    const rate = document.createElement('div');
    rate.classList.add('rate')
    const ratehumanreadable = parseInt(p_rate).toLocaleString()
    rate.innerHTML = "₹"+ratehumanreadable;
    rate.setAttribute('attr-actualrate',p_rate);
    itemqtyprice.append(rate);
    itemdetails.append(itemqtyprice);

    itemcontainer.append(itemdetails);
    totalRate += parseInt(p_rate);
    document.getElementById('totalprice').innerHTML = totalRate.toLocaleString();
    return itemcontainer;
}


addcartbuttons.forEach(element => {
    element.addEventListener('click',()=>{
        const p_rate = element.getAttribute('attr-price');
        const p_name = element.getAttribute('attr-name');
        const p_id = element.getAttribute('attr-pid');
        const emptytext = document.getElementsByClassName('emptycart')
        if (emptytext[0]){
            emptytext[0].remove();
        }
        cartitemscontainer.append(createCartItem(p_rate,p_name,p_id));
    })
});

VanillaTilt.init(document.querySelectorAll(".glass"), {
    max: 10,
    speed: 200,
    glare: true,
    "max-glare":  0.5, 
});


const clearExistingAddGlassActivePosition = () => {
    document.querySelectorAll(".add_glass").forEach(addgls => {
        addgls.classList.remove('active')
    });
}
const clearExistingPayGlassActivePosition = () => {
    document.querySelectorAll(".pay_glass").forEach(paygls => {
        paygls.classList.remove('active')
    });
}

document.querySelectorAll(".add_glass").forEach(gls => {
    gls.addEventListener("click",()=>{
        clearExistingAddGlassActivePosition()
        gls.classList.add('active');

        const uname = $(gls).find('.carddetails').find('.uname').text();
        const address1 = $(gls).find('.bottom').find('h5').text();
        address2 = $(gls).find('.bottom').find('.city').text();
        address2 = address2+" - "+ $(gls).find('.bottom').find('.pin').text();

        $('.final_address').find('.name').html(uname)
        $('.final_address').find('.fulladdress1').html(address1);
        $('.final_address').find('.fulladdress2').html(address2);
        $('.final_address').addClass('active');
        setTimeout(()=>{
            $('.success-icon.addressbook').addClass('active');
        },600)
    })
})
document.querySelectorAll(".pay_glass").forEach(gls => {
    gls.addEventListener("click",()=>{
        clearExistingPayGlassActivePosition()
        gls.classList.add('active');
        const card_type = $(gls).find('.carddetails').find('h2').text();
        const card_number = $(gls).find('.bottom').find('h5').text();
        const card_name = $(gls).find('.bottom').find('.uname').text();

        $('.final_payment').find('.ctype').html(card_type)
        $('.final_payment').find('.cnumber').html(card_number);
        $('.final_payment').find('.cdate').html(card_name);
        $('.final_payment').addClass('active');
        setTimeout(()=>{
            $('.success-icon.paymentbook').addClass('active')
        },600)
        setTimeout(()=>{
            $('.final_order').addClass('active')
        },1500)
    })
})


const placeOrderButton = document.querySelector('.placeorderbtn')
placeOrderButton.addEventListener('click',() => {
    placeOrderButton.classList.add('active');
    $(placeOrderButton).find('.placeorderbtntext').text('Please Wait...');
    setTimeout(()=>{
        $('.cvvbook').addClass('active');
        $(placeOrderButton).find('.placeorderbtntext').text('Order Confirmed');
        placeOrderButton.classList.add('success');
        setTimeout(()=>{
            $('.phase3').removeClass('deactivate');
            $('.phase3').addClass('activate');
            setTimeout(()=>{
                $('.finalloader').addClass('active');
                clearExistingAddGlassActivePosition();
                clearExistingPayGlassActivePosition();
                $('.final_address').removeClass('active');
                $('.final_payment').removeClass('active');
                $('.final_order').removeClass('active')
            },1000);
        },2000);
    },2000)
});


const resetAllButton = document.querySelector('.reset');
resetAllButton.addEventListener('click',()=>{
    restartEverything()
})