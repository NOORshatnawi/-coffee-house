// DOM Elements
const coffeForm = document.getElementById("coffeForm");
const customerContainer = document.querySelector(".Customer_Order");
//document.getElementById("ids").value = Date.now();
//let idsinput = coffeForm["ids"];
const nameInput = coffeForm["name"];
const sizeInput = coffeForm["sizes"];
const milkInput = coffeForm["milk"];
const drinksInput = coffeForm["drinks"];

/* 
{
  name: '',
  age: number,
  roll: number
}
*/

let Customer_Order = JSON.parse(localStorage.getItem("Customer_Order")) || []; // to get items and make items as objet 

const addCustomer = (name, sizes, milk, drinks ) => {
  Customer_Order.push({
    name,
    sizes,
    milk,
    drinks,
   
  });

  localStorage.setItem("Customer_Order", JSON.stringify(Customer_Order)); // to make value as object of string ok baby :)

  return { name, sizes, milk, drinks };
};

const createCustomerElement = ({ name, sizes, milk, drinks }) => {
  // Create elements
  ///const idd = Date.now();
  const customerDiv = document.createElement("div");
  const customerName = document.createElement("h2");
  const orderSize = document.createElement("p");
  const orderMilk = document.createElement("p");
  const orderdrinks = document.createElement("p");
  const delbutton = document.createElement("button");

  // Fill the content
  customerDiv.setAttribute("data-id",name);
  customerName.innerText = "Customer name: " + name;
  orderSize.innerText = "Order Size: " + sizes;
  orderMilk.innerText = "Order milk: " + milk;
  orderdrinks.innerText = "Order drinks: " + drinks;
  delbutton.innerText = "Delete Order";
  delbutton.classList.add('btn');
  //delbutton.onclick = delorder();
 // delbutton.setAttribute("onclick",delorder());


  // Add to the DOM
  customerDiv.append(customerName, orderSize, orderMilk, orderdrinks ,delbutton);
  customerContainer.appendChild(customerDiv);
  customerContainer.style.display = Customer_Order.length === 0 ? "none" : "flex";
 
 
  function delorder() {
   // localStorage.clear();
   customerContainer.addEventListener("click", (e) => {
    if(e.target.classList.contains("btn")){
      
      
      deleteTaskWith(e.target.parentElement.getAttribute("data-id"));

      e.target.parentElement.remove();

     }
   })
   
   //const numorder=localStorage.key(0);  //retrun key

   //var x = sessionStorage.key(0);
    //console.log("delete orderrrrrrr");
   // localStorage.removeItem(numorder);
    /* Remove an item by key from localStorage */
  }
 function deleteTaskWith(orderid){

  
localStorage.removeItem("Customer_Order");
   // addDataToLocalStorageFrom(Customer_Order);
  
 }
  document.querySelector('.btn').addEventListener('click', delorder);

  
};





customerContainer.style.display = Customer_Order.length === 0 ? "none" : "flex";

Customer_Order.forEach(createCustomerElement);

coffeForm.onsubmit = e => {
  e.preventDefault(); // to prevent page refersh

  const newCustomer = addCustomer(
    nameInput.value,
    sizeInput.value,
    milkInput.value,
    drinksInput.value,
  );

  createCustomerElement(newCustomer);  // object to create new order 

  nameInput.value = "";
  sizeInput.value = "";
  milkInput.value = "";
  drinksInput.value = "";
  

};
