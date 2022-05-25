import  {useRouter}  from 'next/router';
import React from 'react'

export default function RecipeDetail() {
    const router = useRouter();
    const recipe = router.query.recipe_detail;
  return (
    <div>{recipe}</div>
  )
}
