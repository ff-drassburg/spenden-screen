import { useEffect, useState } from "react";

function App() {

  const [donates, setDonates] = useState<{
    "gold"?: string[],
    "silver"?: string[],
    "bronze"?: string[]
  }>({});

  const getData = async () => {
    fetch("https://raw.githubusercontent.com/ff-drassburg/spenden/main/src/data/donates.json")
      .then((response) => response.json())
      .then((data) => {
        setDonates(data);

        setTimeout(() => {
          animate(Array.from(document.getElementsByTagName("li")));
        }, 1000);
      })
  };
  const animate = (elementsLeft: HTMLLIElement[]) => {

    if (elementsLeft.length == 0) {
      window.scrollTo({ left: 0, top: 0, behavior: "smooth" })
      getData();
      return;
    }

    var element = elementsLeft[0];
    var rect = element.getBoundingClientRect();

    var newElement = element.cloneNode(true) as HTMLElement;
    newElement.classList.add("zoom-in-out-box");
    newElement.style.position = "absolute";

    if ((rect.top + rect.height + 24) > document.documentElement.clientHeight) {
      var scrollByY = rect.top + rect.height + 24 - document.documentElement.clientHeight;
      window.scrollBy({ left: 0, top: scrollByY, behavior: "smooth" });
      newElement.style.setProperty('--scrollY', window.scrollY + scrollByY + "px");
    } else {
      newElement.style.setProperty('--scrollY', window.scrollY + "px");
    }

    newElement.style.top = (rect.y + window.scrollY) + "px";
    newElement.style.left = rect.x + "px";
    newElement.style.width = element.clientWidth + "px";

    element.parentElement?.appendChild(newElement);

    setTimeout(() => {
      element.parentElement?.removeChild(newElement);
      setTimeout(() => {
        animate(elementsLeft.slice(1));
      }, 1000);
    }, 3000);
  };

  useEffect(() => {
    getData();
  }, []);

  return (
    <>
      <header className="py-3 mb-4 fixed-top border-bottom" style={{ backgroundColor: "#fff" }}>
        <div className="container">
          <nav className="navbar">
            <img alt="" src={require("./images/logo_of_Drassburg_400.png")} className="ffd-logo" />
            <h2 style={{ marginBottom: "-26px" }}>Vielen Dank für alle bereits erhaltenen Spenden</h2>
          </nav>
        </div>
      </header>

      <div className="container buildingblocks">
        {donates["gold"] !== undefined &&
          <>
            <h3>Bausteine Gold</h3>
            <ul className="grid gold">
              {donates["gold"]?.map((donate: string, index: number) => (
                <li key={"gold-" + index} style={{ fontWeight: "bold", color: "white" }}>{donate}</li>
              ))}
            </ul>
          </>
        }

        {donates["silver"] !== undefined &&
          <>
            <h3>Bausteine Silber</h3>
            <ul className="grid silver">
              {donates["silver"]?.map((donate: string, index: number) => (
                <li key={"silver-" + index} style={{ fontWeight: "bold" }}>{donate}</li>
              ))}
            </ul>
          </>
        }

        {donates["bronze"] !== undefined &&
          <>
            <h3>Bausteine Bronze</h3>
            <ul id="bronze" className="grid bronze">
              {donates["bronze"]?.map((donate: string, index: number) => (
                <li key={"bronze-" + index} style={{ fontWeight: "bold", color: "white" }}>{donate}</li>
              ))}
            </ul>
          </>
        }

      </div>
    </>
  );
}

export default App;
