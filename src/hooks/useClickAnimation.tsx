import React from 'react';


export function useClickAnimation(ref: React.RefObject<any>, animationClass: string) {
  return function () {
    ref.current?.classList.contains(animationClass) ?
      ref.current?.classList.remove(animationClass) :
      ref.current?.classList.add(animationClass)
  }
}