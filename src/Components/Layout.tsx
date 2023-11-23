type TLayoutPropS = {
  children: React.ReactNode;
  image: string;
};

export const Layout = ({ children, image }: TLayoutPropS) => {
  return (
    <>
      <div className={`bkg bkg_img_properties ${image}`}>
        <div className="max-width-container">{children}</div>
      </div>
    </>
  );
};
