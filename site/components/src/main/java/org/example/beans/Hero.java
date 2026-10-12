package org.example.beans;

import org.onehippo.cms7.essentials.dashboard.annotations.HippoEssentialsGenerated;
import org.hippoecm.hst.content.beans.Node;
import org.hippoecm.hst.content.beans.standard.HippoCompound;
import org.hippoecm.hst.content.beans.standard.HippoHtml;
import org.hippoecm.hst.content.beans.standard.HippoGalleryImageSet;
import org.hippoecm.hst.content.beans.standard.HippoBean;

@HippoEssentialsGenerated(internalName = "nhsd:Hero")
@Node(jcrType = "nhsd:Hero")
public class Hero extends HippoCompound {
    @HippoEssentialsGenerated(internalName = "nhsd:title")
    public String getTitle() {
        return getSingleProperty("nhsd:title");
    }

    @HippoEssentialsGenerated(internalName = "nhsd:description")
    public HippoHtml getDescription() {
        return getHippoHtml("nhsd:description");
    }

    @HippoEssentialsGenerated(internalName = "nhsd:image")
    public HippoGalleryImageSet getImage() {
        return getLinkedBean("nhsd:image", HippoGalleryImageSet.class);
    }

    @HippoEssentialsGenerated(internalName = "nhsd:link")
    public HippoBean getLink() {
        return getLinkedBean("nhsd:link", HippoBean.class);
    }
}
