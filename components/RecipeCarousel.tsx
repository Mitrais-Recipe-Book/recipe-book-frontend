import Link from "next/link"

export default function RecipeCarousel (props:any) {
    return (
        <Link href={`/recipe/${props.recipeData?.id}`}>
            <div
                className="w-full h-[18rem] sm:h-[20rem] xl:h-[24rem] flex rounded-lg bg-gradient-to-r cursor-pointer from-blue-500 to-transparent"
                style={{
                backgroundImage: `linear-gradient(to bottom, rgba(245, 246, 252, 0.52), rgba(117, 19, 93, 0.73)), url('${process.env.API_URL}recipe/${props?.recipeData.id}/photo')`,
                backgroundRepeat: "no-repeat",
                backgroundPosition: "center",
                backgroundSize: "cover",
                }}
            >
                <div className="m-auto">
                    <h1 className="text-2xl md:text-5xl font-bold text-white ">
                        {props.recipeData?.recipeName}
                    </h1>
                </div>
            </div>
        </Link>
    )
}
