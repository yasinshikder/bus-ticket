 const allBtn=document.getElementsByClassName('btn-all')
 let  count=0;
 let availableSeat=40;
 let grandPrice=0;
 let totalDiscount=0;
 for(const btn of allBtn){
    btn.dataset.selected = "false";

    btn.addEventListener("click",function(e){
        if (btn.dataset.selected === "true") {
            // If the seat is already selected, do nothing and return
            return;
        }      

        if (count >= 4) {
            alert("You have reached the maximum selection limit (4). No more seats can be selected.");
            return; // Return early to prevent further selection
        }

       count+=1;
       availableSeat=availableSeat-1;
       btn.dataset.selected = "true";
       btn.style.backgroundColor="#1DD100";
        const seatNumber=e.target.innerText;

        // appending seats on list
        const div= document.createElement('div');
        div.innerHTML=`
        <div class="flex justify-between"><p>${seatNumber}</p><p>Economoy</p><p>550</p></div> `
        setInnerText('seat-count',count);
       document.getElementById('ticket-title-price-list-container').appendChild(div);
        // sets the updated price 
       const totalPrice=550*count;
       setInnerText("total-price",totalPrice);
       setInnerText('grand-total-ammount',totalPrice);
       setInnerText('total-seat',availableSeat);
        // checking the coupon button
       if(count==4){
        const couponApplyBtn= document.getElementById("couponApplyBtn");
        couponApplyBtn.removeAttribute('disabled')
        couponApplyBtn.style.backgroundColor="#1DD100"

        couponApplyBtn.addEventListener('click', function(){
            const couponBox=document.getElementById('coupon-box').value;
            if(couponBox=='NEW15'){
                totalDiscount=totalPrice*(.15);
                grandPrice=totalPrice*(0.85);
                document.getElementById('coupon-container').classList.add('hidden');
                
            }
            else if(couponBox=='Couple 20'){
                totalDiscount=totalPrice*(.20);
                grandPrice=totalPrice*(.8);
                document.getElementById('coupon-container').classList.add('hidden');
            }

            else{
                alert("Invalid Coupon Code");
                document.getElementById('coupon-box').value="";
                document.getElementById("discount-msg-container").removeChild(div);
                
            }

            setInnerText('grand-total-ammount',grandPrice);
            // set discount price list
            const div=document.createElement('div');

            div.innerHTML=`<div class="flex justify-between mb-2">
            <p>Discount Price</p>
            <p>BDT <span id="total-price">${totalDiscount}</span></p>
            </div>`

          document.getElementById("discount-msg-container").appendChild(div);

          
          

        })


       }
       // Get references to the input element and the next button
            const phoneNumberInput = document.getElementById('phoneNumber');
            const btnNext = document.getElementById('btn-next');
            const popUp=document.getElementById('popUp');

            // Function to enable the next button if conditions are met
            function enableNextButton() {
                const phoneNumber = phoneNumberInput.value;
                
                // Check if the count is at least 1 and the phone number is not empty
                if (count >= 1 && phoneNumber.trim() !== "") {
                    // Enable the button and change its background color
                    btnNext.removeAttribute('disabled');
                    btnNext.style.backgroundColor = "#1DD100";
                    
                    // Add an event listener for the button
                    if (!btnNext.hasListener) {
                        btnNext.addEventListener('click', function () {
                            // Show the popup
                            popUp.showModal();
                        });
                        btnNext.hasListener = true; // Add a flag to track that the listener has been added
                    }
                } else {
                    // If the conditions are not met, disable the button
                    btnNext.setAttribute('disabled', true);
                    btnNext.style.backgroundColor = ""; // Reset background color
                }
            }

            // Call the function initially to set the button state
              enableNextButton();

            // Add event listeners to trigger the function when the phone number or seat count changes
            phoneNumberInput.addEventListener('input', enableNextButton);
            // remove modal 
           const closePopUp= document.getElementById('closePopUpBtn')
           closePopUp.addEventListener('click',function(){
              popUp.close();
           })

    })
 }



//  set inner text

function setInnerText(id,value){
    document.getElementById(id).innerText=value;
}