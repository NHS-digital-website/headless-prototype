package org.example.channels;

import org.hippoecm.hst.configuration.channel.ChannelInfo;
import org.hippoecm.hst.core.parameters.DropDownList;
import org.hippoecm.hst.core.parameters.FieldGroup;
import org.hippoecm.hst.core.parameters.FieldGroupList;
import org.hippoecm.hst.core.parameters.JcrPath;
import org.hippoecm.hst.core.parameters.Parameter;

@FieldGroupList({
        @FieldGroup(
                titleKey = "fields.channel",
                value = {"logo", "pageTitlePrefix", "themeCss", "color"}
        )
})
public interface WebsiteInfo extends ChannelInfo {
    @Parameter(name = "logo")
    @JcrPath(
            pickerSelectableNodeTypes = {"hippogallery:imageset"},
            pickerInitialPath = "/content/gallery/logos"
    )
    String getLogoPath();

    @Parameter(name = "pageTitlePrefix")
    String getPageTitlePrefix();

    @Parameter(name = "themeCss",
            defaultValue = "/content/assets/themes/css/green.css")
    @JcrPath(
            pickerConfiguration = "cms-pickers/assets",
            pickerSelectableNodeTypes = {"hippogallery:exampleAssetSet"},
            pickerInitialPath = "/content/assets/themes/css"
    )
    String getThemeCss();

    @Parameter(name = "color", defaultValue = "blue")
    @DropDownList({"red", "green", "blue"})
    String getColor();
}