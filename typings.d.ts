import  {Author,Book} from "@prisma/client";

interface IBook extends Book {
    authors :Author[];
    
}