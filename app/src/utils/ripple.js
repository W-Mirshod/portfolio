export const useRippleEffect = () => {
  const createRipple = (event) => {
    const button = event.currentTarget;
    
    const circle = document.createElement('span');
    const diameter = Math.max(button.clientWidth, button.clientHeight);
    const radius = diameter / 2;
    
    circle.style.width = circle.style.height = `${diameter}px`;
    circle.style.left = `${event.clientX - button.getBoundingClientRect().left - radius}px`;
    circle.style.top = `${event.clientY - button.getBoundingClientRect().top - radius}px`;
    circle.classList.add('ripple-effect');
    
    // Remove any existing ripples
    const ripple = button.querySelector('.ripple-effect');
    if (ripple) {
      ripple.remove();
    }
    
    button.appendChild(circle);
    
    // Remove it after animation completes
    setTimeout(() => {
      if (circle) {
        circle.remove();
      }
    }, 400);
  };
  
  return createRipple;
};
