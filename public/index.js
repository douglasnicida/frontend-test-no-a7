document.addEventListener("DOMContentLoaded", () => {
    const itemInput = document.getElementsByTagName("input")[0];
    const itemList = document.getElementById("item-list");

    itemInput.addEventListener("keyup", async (event) => {
        if(event.key === "Enter"){
            event.preventDefault();
            const itemName = itemInput.value.trim();
            
            if (itemName) {
                try {
                    const response = await fetch("/items/add", {
                        method: "POST",
                        headers: {
                        "Content-Type": "application/json"
                        },
                        body: JSON.stringify({ number: itemName })
                    });
    
                    if (response.ok) {
                        const data = await response.json();
                        itemList.innerHTML = "";
            
                        data.items.forEach(item => {
                            const listItem = document.createElement("div");
                            listItem.classList.add("item");
                        
                            const listItemContent = document.createElement("div");
                            listItemContent.classList.add("number");
                            
                            listItemContent.textContent = item;
                        
                            listItem.appendChild(listItemContent);
                            itemList.appendChild(listItem);
                        });
            
                        itemInput.value = "";
                    } else {
                        console.error("Error to add the items");
                    }
                } catch (error) {
                    console.error("Requisition Error:", error);
                }
            }
        }
    });
});
  