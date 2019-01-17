import React from 'react';
import AOS from 'aos';
import 'aos/dist/aos.css';


import './bio.css';


export default ()=>{
    AOS.init();
    return (
        <div id="bio">
        <div className="left d-lg-block d-none"  data-aos="fade-right"
     data-aos-duration="3000" />
        <div className="biopict d-lg-block d-none"  data-aos="fade-right"
     data-aos-duration="3000"></div>
        <div className="offset-lg-4 col-lg-8">
        <h2>Biografia</h2>
        <p>Lorem ipsum dolor sit amet, consectetur adipiscing elit. Phasellus ligula orci, sagittis vel orci eu, tristique egestas sapien. Aenean id porttitor odio. Maecenas ligula ex, rutrum ultricies scelerisque vitae, suscipit et nibh. Etiam rutrum turpis quis congue accumsan. Phasellus euismod imperdiet nulla, non pulvinar arcu pretium ut. In maximus enim a dolor eleifend, in efficitur magna facilisis. Cras ultrices justo sit amet enim dignissim sodales. Vivamus et justo lorem. Praesent semper in sapien vitae vulputate. Curabitur molestie massa at nisi commodo pellentesque. Suspendisse aliquam nec massa hendrerit facilisis. Pellentesque posuere lacinia velit, non condimentum felis rutrum ac. Fusce lectus nibh, feugiat id eros a, egestas placerat lorem. Pellentesque et tincidunt eros.
            Integer finibus, elit non pretium cursus, ligula enim scelerisque eros, ut imperdiet felis lorem quis eros. Duis felis metus, consectetur consequat venenatis ut, maximus nec neque. Mauris nec urna mauris. Aliquam a massa velit. Vestibulum ut turpis in tellus auctor euismod nec sit amet lacus. Maecenas suscipit justo erat, nec consectetur tellus scelerisque eget. Curabitur pellentesque ex sed ultrices ultricies. Praesent pulvinar tellus non viverra ullamcorper. Cras malesuada arcu orci, sit amet lacinia tellus fermentum sed. Ut non tempor urna. Phasellus a egestas elit. Ut nec velit ante. Morbi mattis, neque ut consequat bibendum, lacus odio egestas justo, sagittis facilisis sapien justo vitae neque.
           </p> <p>Integer eu diam cursus, malesuada sapien sed, accumsan nisl. Nullam at augue vulputate risus tristique malesuada nec at nunc. Etiam sit amet diam sit amet arcu aliquet aliquam. In nec lectus nec nunc tincidunt malesuada sit amet a augue. Ut a massa urna. Sed fringilla ullamcorper tristique. Aliquam eu cursus metus, in faucibus arcu. Nunc placerat ligula nec eros scelerisque facilisis. Fusce sit amet aliquam leo, sit amet varius turpis. Sed a augue id lacus condimentum posuere. Aliquam ac tincidunt massa, in molestie nisl. Curabitur volutpat est id metus tempus, quis fringilla augue lobortis. Quisque id consequat diam. Mauris vestibulum efficitur augue non eleifend. Praesent sodales sapien id nisl tincidunt interdum.
            Duis condimentum mi non ex rutrum semper. Curabitur tristique, leo at congue rhoncus, urna est tristique arcu, quis convallis libero erat id urna. Praesent in erat non purus efficitur lacinia. Proin nec odio sit amet justo dictum bibendum. Duis id posuere arcu, nec accumsan tellus. Nam ultricies vestibulum urna blandit maximus. Pellentesque in neque non lectus congue accumsan id eu nunc. Nullam ut risus quis libero ultrices euismod. Cras magna erat, feugiat hendrerit nulla ut, ultrices fringilla ligula.
        </p>
        </div>
        </div>
    );
}