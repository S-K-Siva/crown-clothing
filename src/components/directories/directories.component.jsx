import './directories.styles.scss';
import CategoryItem from '../category-item/category-item.component';
const DirectoryItem = (props) => {
    const {categories} = props;
    return(
        <div className='directories-container'>
      {
        categories.map((category) => {
          return (
            <CategoryItem category={category} key={category.title}/>
          )
        })
      }
    </div>
    )
}

export default DirectoryItem;