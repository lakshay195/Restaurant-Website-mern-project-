import React, { useState, useEffect } from 'react';
import Header from '../../components/Header';
import Footer from '../../components/Footer';
import './Menu.css'; // Add styles here

const Mainmenu = () => {
  const [cart, setCart] = useState([]);
  const [totalPrice, setTotalPrice] = useState(0);

  const menuItems = [
    // Menu items data
    { name: 'Classic Burger', price: 8.99, img: 'https://chindeep.com/wp-content/uploads/2015/01/ultimatemeatloafsam-300x300.jpg' },
    { name: 'Margherita Pizza', price: 12.50, img: 'https://www.stonefire.com/wp-content/uploads/2021/07/Stonefire_Pizza_SalamiBuffaloMozzarella1_2017-480x480.jpg' },
    { name: 'Chicken Caesar Salad', price: 9.99, img: 'https://www.nutmegnanny.com/wp-content/uploads/2022/07/grilled-caesar-chicken-salad-3-480x480.jpg' },
    { name: 'Sushi Platter', price: 18.00, img: 'https://cdn.saffire.com/images.ashx?t=ig&rid=VisitBuenaPark&i=odori_sushi(1).jpg&w=330&h=330&cropbox=1&cropboxhpos=center&stf=1' },
    { name: 'Pasta Carbonara', price: 14.50, img: 'https://en.shiino.co.jp/household/img/detail/detail_0229.jpg' },
    { name: 'Veggie Wrap', price: 7.99, img: 'https://www.bowlofdelicious.com/wp-content/uploads/2014/01/Veggie-Wraps-square.jpg' },
    { name: 'Steak Dinner', price: 20.99, img: 'https://cdn.shopify.com/s/files/1/0560/9344/2246/files/IG-steak-THE-VINES-AT-CHV_480x480.png?v=1674747640' },
    { name: 'Fruit Salad', price: 6.50, img: 'https://fastly.4sqi.net/img/general/600x600/STlel9rATKk-nZSvjB5kuNlGrVgGyi4RsbTdRAZdF-Y.jpg' },
    { name: 'Seafood Paella', price: 17.99, img: 'https://members.goingout.co.uk/api/image-resize?width=302&path=assets/img/category/Mediterranean-Cat-Image.jpg' },
    { name: 'Chocolate Lava Cake', price: 8.00, img: 'https://i.pinimg.com/originals/1c/5c/10/1c5c10dbd50f8f55f524a1690a7faab9.jpg' },
    { name: 'Ice Cream Truffle', price: 5.90, img: 'https://s3.amazonaws.com/img.kh-labs.com/ce3OYL63ff8fbe64d610.84529379' },
  
  ];

  useEffect(() => {
    const savedCart = JSON.parse(sessionStorage.getItem('cartItems')) || [];
    setCart(savedCart);
    const total = savedCart.reduce((acc, item) => acc + item.price, 0);
    setTotalPrice(total);
  }, []);

  const addToCart = (name, price) => {
    setCart(prevCart => {
      const newCart = [...prevCart, { name, price }];
      sessionStorage.setItem('cartItems', JSON.stringify(newCart)); // Save cart data to sessionStorage
      const newTotalPrice = newCart.reduce((acc, item) => acc + item.price, 0);
      setTotalPrice(newTotalPrice);
      return newCart;
    });
  };

  const removeFromCart = (name) => {
    setCart(prevCart => {
      const newCart = prevCart.filter(item => item.name !== name);
      sessionStorage.setItem('cartItems', JSON.stringify(newCart)); // Save updated cart data to sessionStorage
      const newTotalPrice = newCart.reduce((acc, item) => acc + item.price, 0);
      setTotalPrice(newTotalPrice);
      return newCart;
    });
  };

  const clearCart = () => {
    setCart([]);
    sessionStorage.removeItem('cartItems'); // Clear cart data from sessionStorage
    setTotalPrice(0);
  };

  return (
    <div>
      <Header />
      <div className="container menu-container">
        <div className="menu-frame">
          <h1 className="display-4 mb-4">Our Menu</h1>
          <div className="row">
            {menuItems.map((item, index) => (
              <div key={index} className="col-lg-4 col-md-6 mb-4">
                <div className="card">
                  <img src={item.img} className="card-img-top" alt={item.name} />
                  <div className="card-body">
                    <h5 className="card-title">{item.name}</h5>
                    <p className="card-text">Price: ${item.price.toFixed(2)}</p>
                    <button
                      className="btn btn-primary btn-sm add-to-cart"
                      onClick={() => addToCart(item.name, item.price)}
                    >
                      Add to Cart
                    </button>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>

        <div className="cart-frame">
          <h2>Your Cart</h2>
          <div className="cart-items">
            <ul>
              {cart.map((item, index) => (
                <li key={index}>
                  {item.name} - ${item.price.toFixed(2)}
                  <button
                    className="btn btn-danger btn-sm delete-from-cart"
                    onClick={() => removeFromCart(item.name)}
                  >
                    Remove
                  </button>
                </li>
              ))}
            </ul>
          </div>
          <p>Total: ${totalPrice.toFixed(2)}</p>
          <a href="order" className="btn btn-primary order-btn">Order Now</a>
          <button className="btn btn-danger" onClick={clearCart}>Clear Cart</button>
        </div>
      </div>
      <Footer />
    </div>
  );
};

export default Mainmenu;
