import React, {
    Dispatch,
    SetStateAction,
    useCallback,
    useContext,
} from "react";
import { styled } from "@mui/material/styles";
import {
    Box,
    Divider,
    IconButton,
    List,
    ListItem,
    ListItemButton,
    ListItemIcon,
    ListItemText,
    Typography,
    useTheme,
} from "@mui/material";
import WorkIcon from "@mui/icons-material/Work";

import ChevronLeftIcon from "@mui/icons-material/ChevronLeft";
import ChevronRightIcon from "@mui/icons-material/ChevronRight";
import ProjectContext from "../context/project";
import UserContext from "../context/user";
import { PrjObj } from "../interfaces";

/*

    This component roles are the following:
        * Render Projects List
        * Buttons to toggle the current project

*/

const DrawerHeader = styled("div")(({ theme }) => ({
    display: "flex",
    alignItems: "center",
    padding: theme.spacing(0, 1),
    // necessary for content to be below app bar
    ...theme.mixins.toolbar,
    justifyContent: "flex-end",
}));

interface PrjAsideImp {
    open: boolean;
    setOpen: Dispatch<SetStateAction<boolean>>;
}

const PrjAside = ({ open, setOpen }: PrjAsideImp) => {
    const theme = useTheme();

    const projectContext = useContext(ProjectContext);
    const userContext = useContext(UserContext);

    const handleDrawerClose = useCallback(() => {
        setOpen(false);
    }, []);

    const handleSelectPrj = useCallback(
        ({ prjId, selectedPrjId }: { prjId: string; selectedPrjId: string }) => {
            if (prjId !== selectedPrjId || !selectedPrjId)
                projectContext?.setSelectedPrj({ id: prjId, data: null });
        },
        []
    );

    return (
        <>
            <DrawerHeader style={{ display: "flex", justifyContent: "center", alignItems: "center" }}>
                <Typography variant="body1">
                    👋🏻 Welcome {userContext?.user?.data?.fullName}
                </Typography>
            </DrawerHeader>
            <Divider />
            <Box>
                <Typography paddingX={2} marginY={1} variant="h6">
                    Projects
                </Typography>
                <List>
                    {projectContext?.projects?.map((prj: PrjObj) => (
                        <ListItem key={prj._id} disablePadding
                            className={prj._id == projectContext.selectedPrj?.id ? "active_project" : ""}

                        >
                            <ListItemButton
                                onClick={() => {
                                    handleSelectPrj({
                                        prjId: prj._id,
                                        selectedPrjId: projectContext.selectedPrj?.id ?? "",
                                    });
                                    handleDrawerClose();
                                }}
                            >
                                <ListItemIcon>
                                    <WorkIcon style={{ color: "whitesmoke" }} />
                                </ListItemIcon>
                                <ListItemText
                                    primary={prj.title[0].toUpperCase() + prj.title.slice(1)}
                                />
                            </ListItemButton>
                        </ListItem>
                    ))}
                </List>
            </Box>
        </>
    );
};

export default PrjAside;
