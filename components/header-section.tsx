"use client"

import * as React from "react"
import Image from "next/image"
import { useCookie } from "react-use"
import {
  usePathname,
  useRouter,
  useSearchParams,
  type ReadonlyURLSearchParams,
} from "next/navigation"

import { Tabs, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { Button } from "@/components/ui/button"
import {
  Dialog,
  DialogContent,
  DialogFooter,
  DialogHeader,
} from "@/components/ui/dialog"
import {
  VIP_18_COOKIE_NAME,
  VIP_18_COOKIE_ALLOWED_VALUE,
  VIP_18_COOKIE_DENIED_VALUE,
  VIP_QUERY_PARAM_VERIFY,
  VIP_QUERY_PARAM_DENIED,
  type VipQueryParam,
} from "@/lib/constants/vip"

function buildUrlWithoutVipParam(
  pathname: string,
  searchParams: ReadonlyURLSearchParams
) {
  const params = new URLSearchParams(searchParams.toString())
  params.delete("vip")

  const query = params.toString()
  return query ? `${pathname}?${query}` : pathname
}

type HeaderSectionProps = {
  pageLabel?: string;
  pageDescription?: string;
  ageRestrictImageUrl?: string;
};

export default function HeaderSection({ pageLabel, pageDescription, ageRestrictImageUrl }: HeaderSectionProps) {
  const router = useRouter()
  const pathname = usePathname()
  const searchParams = useSearchParams()
  const [vipCookieValue, updateVipCookie] = useCookie(VIP_18_COOKIE_NAME)

  const [isAgeDialogOpen, setIsAgeDialogOpen] = React.useState(false)
  const [isDeniedInDialog, setIsDeniedInDialog] = React.useState(false)

  const tabValue = pathname.startsWith("/vip") ? "vip" : "free"

  const clearVipQueryParam = React.useCallback(() => {
    const nextUrl = buildUrlWithoutVipParam(pathname, searchParams)
    router.replace(nextUrl)
  }, [pathname, router, searchParams])

  React.useEffect(() => {
    const vipParamRaw = searchParams.get("vip")
    if (!vipParamRaw) return

    if (vipParamRaw === (VIP_QUERY_PARAM_VERIFY satisfies VipQueryParam)) {
      setIsDeniedInDialog(false)
      setIsAgeDialogOpen(true)
      clearVipQueryParam()
      return
    }

    if (vipParamRaw === (VIP_QUERY_PARAM_DENIED satisfies VipQueryParam)) {
      setIsAgeDialogOpen(false)
      clearVipQueryParam()
    }
  }, [clearVipQueryParam, searchParams])

  const handleTabsChange = React.useCallback(
    (value: string) => {
      if (value === tabValue) return

      if (value === "free") {
        setIsAgeDialogOpen(false)
        setIsDeniedInDialog(false)
        router.push("/")
        return
      }

      if (vipCookieValue === VIP_18_COOKIE_ALLOWED_VALUE) {
        setIsAgeDialogOpen(false)
        setIsDeniedInDialog(false)
        router.push("/vip")
        return
      }

      setIsDeniedInDialog(false)
      setIsAgeDialogOpen(true)
    },
    [router, tabValue, vipCookieValue]
  )

  const handleConfirm18 = React.useCallback(() => {
    updateVipCookie(VIP_18_COOKIE_ALLOWED_VALUE)
    setIsDeniedInDialog(false)
    setIsAgeDialogOpen(false)
    router.push("/vip")
  }, [router, updateVipCookie])

  const handleDeny18 = React.useCallback(() => {
    updateVipCookie(VIP_18_COOKIE_DENIED_VALUE)
    setIsDeniedInDialog(true)
  }, [updateVipCookie])

  const handleGoBack = React.useCallback(() => {
    setIsDeniedInDialog(false)
    setIsAgeDialogOpen(false)
  }, [])

  return (
    <section className="mt-6 mb-12 px-6">
      {pageLabel && (
        <div className="mb-4 text-white text-center text-2xl font-bold uppercase">
          {pageLabel}
        </div>
      )}

      <Tabs value={tabValue} onValueChange={handleTabsChange}>
        <TabsList className="w-full">
          <TabsTrigger value="free">Free TG Links</TabsTrigger>
          <TabsTrigger value="vip">VIP Exclusive</TabsTrigger>
        </TabsList>
      </Tabs>

      {pageDescription && (
        <div className="mt-4 text-[#F2F2F266] text-center">
          {pageDescription}
        </div>
      )}

      <Dialog
        open={isAgeDialogOpen}
        onOpenChange={(open) => {
          setIsAgeDialogOpen(open)
          if (!open) {
            setIsDeniedInDialog(false)
          }
        }}
      >
        <DialogContent className="p-0 max-w-[640px] w-[calc(100%-16px)] sm:w-full sm:max-w-[640px]" showCloseButton={false}>
        {/* !isDeniedInDialog */}
          {!isDeniedInDialog ? (
            <>
              {ageRestrictImageUrl && (
                <div className='relative w-full aspect-640/140'>
                  <Image 
                    src={ageRestrictImageUrl} 
                    alt="Age restriction" 
                    fill
                    className='rounded-t-lg object-cover'
                    priority 
                  />
                </div>
              )}
              <div className="p-6 md:p-4">
                <DialogHeader className="mb-6">
                  <div className="text-center text-2xl font-bold text-[#F2F2F2] mb-4">WARNING: This site is for adults only!</div>
                  <div className="text-center text-[#F2F2F266]">By accessing this website, I confirm that I am 18 years of age or older and agree to the Terms of Use.</div>
                </DialogHeader>

                <DialogFooter className="flex flex-col gap-2 items-center sm:flex-row sm:justify-center">
                  <Button variant="muted" onClick={handleDeny18}>
                  Exit
                  </Button>
                  <Button onClick={handleConfirm18}>I am 21 years old or older</Button>
                </DialogFooter>
              </div>
            </>
          ) : (
            <>
              <div className="p-6 md:p-4">
                <DialogHeader>
                  <div className="text-center text-2xl font-bold text-[#F2F2F2] mb-4">This site is intended only for users<br />over the age of 21.</div>
                </DialogHeader>

                <DialogFooter className="sm:justify-center justify-center">
                  <Button variant="muted" onClick={handleGoBack}>
                  Oh, I made a mistake and want to go back.
                  </Button>
                </DialogFooter>
              </div>
            </>
          )}
        </DialogContent>
      </Dialog>
    </section>
  );
}
