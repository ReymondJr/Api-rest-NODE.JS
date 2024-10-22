const { objToLists } = require('prelude-ls')
const z = require('zod')

const movieShema = z.object({
    title: z.string({
        invalid_type_error: 'Movie title must be a string',
        required_error: 'Movie title is required'
    }),
    year: z.number().int().min(1950).max(2025),
    director: z.string(),
    duration: z.number().int().positive(),
    rate: z.number().min(0).max(10).default(4),
    poster: z.string().url({
        message: "Poster must be a valid url"
    }),
    genre : z.array(z.enum(['Action', 'Adventure', 'Comedy', 'Drama', 'Crime', 'Fantasy', 'Horror', 'Thiller', 'Sci-fi']))
})

function validateMovie(object){
    return movieShema.safeParse(object)
}

function validatePartialMovie(object){
    return movieShema.partial().safeParse(object)
}

module.exports ={
    validateMovie,
    validatePartialMovie
}