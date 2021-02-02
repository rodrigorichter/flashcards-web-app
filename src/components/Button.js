import React from 'react';

function Button(props) {

  let className = "mx-1 rounded-lg tracking-wider uppercase font-semibold h-content ";

  // pick only one of these
  if (props.regulardisabled) className+= "bg-blackhover text-textdisabled "
  else if (props.regular) className += "bg-primary hover:bg-primarydarker text-white ";
  if (props.text) className += "text-primary bg-transparent hover:bg-primarymuchlighter ";
  if (props.textblack) className += "text-textsecond bg-transparent hover:bg-blackhover ";
  if (props.icon) className += "text-textsecond hover:text-textfirst p-2 hover:bg-blackhover ";
  else if (props.iconwhite) className += "text-white p-2 hover:bg-whitehover "; else className+= " px-4 py-2 ";

  // pick any of these
  if (props.large) className += "text-xl "; else className += "text-sm ";
  if (props.withicon) className+= "flex items-center ";



  return (
    <button className={(props.className || "") + className}
            onClick={props.onClick}
    >
      {props.children}
    </button>
  );
}

export default Button;
