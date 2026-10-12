package org.example.beans;

import org.onehippo.cms7.essentials.dashboard.annotations.HippoEssentialsGenerated;
import org.hippoecm.hst.content.beans.Node;
import java.util.Calendar;
import org.example.beans.Hero;

@HippoEssentialsGenerated(internalName = "nhsd:Blog")
@Node(jcrType = "nhsd:Blog")
public class Blog extends BaseDocument {
    @HippoEssentialsGenerated(internalName = "nhsd:date")
    public Calendar getDate() {
        return getSingleProperty("nhsd:date");
    }

    @HippoEssentialsGenerated(internalName = "nhsd:Hero")
    public Hero getHero() {
        return getBean("nhsd:Hero", Hero.class);
    }
}
