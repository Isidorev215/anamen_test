import axios from "axios";
import { ref } from "vue";

const getDataObject = (url) => {
  const data = ref(null);
  const error = ref(null);
  const isPending = ref(false);
  
  const load = async () => {

    isPending.value = true;
    try {
      let res = await axios.get(url)
      data.value = res.data;
      error.value = null;
      isPending.value = false;
    }catch(err) {
      error.value = err;
      isPending.value = false;
    }
  }

  return { data, error, isPending, load }
}

export default getDataObject;
