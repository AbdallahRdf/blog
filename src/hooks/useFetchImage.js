import { useCallback, useContext, useEffect, useState } from "react";
import { SupabaseContext } from "../context/contexts";
import { UPLOAD_BUCKET } from "../config/upload";

const useFetchImage = (imagePath) => {
    const supabase = useContext(SupabaseContext)

    const [image, setImage] = useState(undefined);
    const [isFetching, setIsFetching] = useState(true);

    const fetchImage = useCallback(async () => {
        const { data: exists } = await supabase.storage.from(UPLOAD_BUCKET).exists(imagePath);
        const imagePublicURL = exists ? supabase.storage.from(UPLOAD_BUCKET).getPublicUrl(imagePath).data.publicUrl : null;
        setIsFetching(false);
        setImage(imagePublicURL);
    }, []);

    useEffect(() => {
        fetchImage();
    }, []);

    return { image, isFetching }
}

export default useFetchImage;