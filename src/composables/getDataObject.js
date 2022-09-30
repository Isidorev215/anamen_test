import axios from "axios";
import { isRef, ref, unref, watchEffect } from "vue";

const getDataObject = (url) => {
  const data = ref(null);
  const error = ref(null);
  const isPending = ref(false);
  
  const load = async () => {

    isPending.value = true;
    try {
      let res = await axios.get(unref(url))
      data.value = res.data;
      error.value = null;
      isPending.value = false;
    }catch(err) {
      error.value = err;
      isPending.value = false;
    }
  }
  if(isRef(url)){
    watchEffect(load)
  }else{
    load()
  }

  return { data, error, isPending }
}

export default getDataObject;
